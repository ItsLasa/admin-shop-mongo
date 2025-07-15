"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, RefreshCw, Database, Activity, AlertTriangle, Info } from "lucide-react"

interface DatabaseStatus {
  connection: {
    success: boolean
    error: string | null
    details: any
  }
  health: {
    success: boolean
    collections: Record<string, any>
    error?: string
    timestamp: string
  }
  timestamp: string
}

export default function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastChecked, setLastChecked] = useState<string>("")

  const checkDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-db")
      const data = await response.json()
      setStatus(data)
      setLastChecked(new Date().toLocaleString())
    } catch (error) {
      console.error("Error checking database:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkDatabase()
  }, [])

  const getStatusIcon = (success: boolean) => {
    return success ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />
  }

  const getStatusBadge = (success: boolean) => {
    return <Badge variant={success ? "default" : "destructive"}>{success ? "Connected" : "Disconnected"}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Database Status</h2>
          <p className="text-gray-600">Monitor your MongoDB connection and health</p>
        </div>
        <Button onClick={checkDatabase} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Checking..." : "Refresh"}
        </Button>
      </div>

      {lastChecked && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>Last checked: {lastChecked}</AlertDescription>
        </Alert>
      )}

      {status && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <CardTitle>Connection Status</CardTitle>
                </div>
                {getStatusIcon(status.connection.success)}
              </div>
              <CardDescription>MongoDB connection health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Status:</span>
                {getStatusBadge(status.connection.success)}
              </div>

              {status.connection.error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{status.connection.error}</AlertDescription>
                </Alert>
              )}

              {status.connection.details && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Database:</span>
                    <span className="font-mono">{status.connection.details.database}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collections:</span>
                    <span>{status.connection.details.totalCollections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Size:</span>
                    <span>{(status.connection.details.dataSize / 1024).toFixed(2)} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Indexes:</span>
                    <span>{status.connection.details.indexes}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Collections Health */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <CardTitle>Collections Health</CardTitle>
              </div>
              <CardDescription>Individual collection status</CardDescription>
            </CardHeader>
            <CardContent>
              {status.health.success ? (
                <div className="space-y-3">
                  {Object.entries(status.health.collections).map(([name, info]: [string, any]) => (
                    <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(info.exists)}
                        <div>
                          <div className="font-medium">{name}</div>
                          {info.exists && <div className="text-sm text-gray-500">{info.documentCount} documents</div>}
                        </div>
                      </div>
                      <div className="text-right">
                        {info.exists ? (
                          <Badge variant="outline">{info.hasSampleData ? "Has Data" : "Empty"}</Badge>
                        ) : (
                          <Badge variant="destructive">Missing</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{status.health.error || "Failed to check collections health"}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Environment Check */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Configuration</CardTitle>
          <CardDescription>Check your environment variables</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>MONGODB_URI:</span>
              <Badge variant={process.env.MONGODB_URI ? "default" : "destructive"}>
                {process.env.MONGODB_URI ? "Set" : "Missing"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>NEXTAUTH_SECRET:</span>
              <Badge variant={process.env.NEXTAUTH_SECRET ? "default" : "destructive"}>
                {process.env.NEXTAUTH_SECRET ? "Set" : "Missing"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>NEXTAUTH_URL:</span>
              <Badge variant={process.env.NEXTAUTH_URL ? "default" : "destructive"}>
                {process.env.NEXTAUTH_URL ? "Set" : "Missing"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common database operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" onClick={() => window.open("/api/test-db", "_blank")}>
              View Raw Status
            </Button>
            <Button variant="outline" onClick={checkDatabase}>
              Test Connection
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

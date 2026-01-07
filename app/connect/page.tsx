"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Database, Shield, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  SUPPORTED_DIALECTS,
  DEFAULT_PORTS,
  SECURITY_NOTICE,
} from "@/constants";
import { testConnection } from "@/lib/schema/parser";
import { DatabaseDialect } from "@/types/schema";

export default function ConnectPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("form");
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [formData, setFormData] = useState({
    dialect: "postgresql" as DatabaseDialect,
    host: "",
    port: DEFAULT_PORTS.postgresql,
    username: "",
    password: "",
    database: "",
    ssl: true,
  });

  const [connectionUrl, setConnectionUrl] = useState("");

  const handleDialectChange = (dialect: DatabaseDialect) => {
    setFormData((prev) => ({
      ...prev,
      dialect,
      port: DEFAULT_PORTS[dialect],
    }));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTestConnection = async () => {
    if (!agreedToTerms) {
      toast.error("Please agree to Terms & Privacy Policy first");
      return;
    }

    setIsTesting(true);
    try {
      const result = await testConnection(formData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Connection test failed");
    } finally {
      setIsTesting(false);
    }
  };

  const handleGenerateERD = async () => {
    if (!agreedToTerms) {
      toast.error("Please agree to Terms & Privacy Policy first");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/erd?demo=true");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Connect Database</h1>
            <p className="text-muted-foreground">
              Enter your database credentials to generate an ERD diagram
            </p>
          </div>

          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Shield className="h-4 w-4 text-primary" />
            <AlertDescription className="text-foreground">
              <span className="font-medium">{SECURITY_NOTICE.title}.</span>{" "}
              {SECURITY_NOTICE.description}{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Learn more
              </Link>
            </AlertDescription>
          </Alert>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>
                Choose your database type and enter connection details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label className="mb-3 block">Database Type</Label>
                <div className="flex gap-2">
                  {SUPPORTED_DIALECTS.map((dialect) => (
                    <Button
                      key={dialect.value}
                      type="button"
                      variant={
                        formData.dialect === dialect.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        handleDialectChange(dialect.value as DatabaseDialect)
                      }
                      className="flex-1"
                    >
                      {dialect.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="form">Form</TabsTrigger>
                  <TabsTrigger value="url">Connection URL</TabsTrigger>
                </TabsList>

                <TabsContent value="form" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="host">Host</Label>
                      <Input
                        id="host"
                        placeholder="localhost"
                        value={formData.host}
                        onChange={(e) =>
                          handleInputChange("host", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port">Port</Label>
                      <Input
                        id="port"
                        placeholder={DEFAULT_PORTS[formData.dialect]}
                        value={formData.port}
                        onChange={(e) =>
                          handleInputChange("port", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="postgres"
                        value={formData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="database">Database Name</Label>
                    <Input
                      id="database"
                      placeholder="mydb"
                      value={formData.database}
                      onChange={(e) =>
                        handleInputChange("database", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ssl"
                      checked={formData.ssl}
                      onCheckedChange={(checked) =>
                        handleInputChange("ssl", !!checked)
                      }
                    />
                    <Label htmlFor="ssl" className="text-sm font-normal">
                      Use SSL connection (recommended)
                    </Label>
                  </div>
                </TabsContent>

                <TabsContent value="url" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">Connection String</Label>
                    <Input
                      id="url"
                      placeholder={
                        formData.dialect === "postgresql"
                          ? "postgresql://user:pass@host:5432/dbname"
                          : "mysql://user:pass@host:3306/dbname"
                      }
                      value={connectionUrl}
                      onChange={(e) => setConnectionUrl(e.target.value)}
                      autoComplete="off"
                    />
                    <p className="text-xs text-muted-foreground">
                      Format: {formData.dialect}
                      ://username:password@host:port/database
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center space-x-2 mt-6 pt-6 border-t">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={handleTestConnection}
                  disabled={isTesting || !agreedToTerms}
                  className="flex-1"
                >
                  {isTesting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Test Connection
                </Button>
                <Button
                  onClick={handleGenerateERD}
                  disabled={isLoading || !agreedToTerms}
                  className="flex-1"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Generate ERD
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

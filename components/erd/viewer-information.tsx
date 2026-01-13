import Image from "next/image";
import { Separator } from "../ui/separator";
import { Database } from "lucide-react";
import { useERDStore } from "@/lib/store/erd-store";

export function ViewerInformation() {
  const schema = useERDStore((state) => state.schema);
  const dbType = schema?.dialect;
  console.log("🚀 ~ ViewerInformation ~ dbType:", dbType);
  console.log(schema?.name);
  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col items-center gap-1 rounded-lg border border-border/50 bg-card/95 p-1.5 shadow-lg backdrop-blur">
      <div>
        {dbType === "mysql" ? (
          <Image
            src={"/img/mysql-logo.png"}
            // src={"/mysql.svg"}
            alt={`logo-${dbType}`}
            width={100}
            height={0}
          />
        ) : (
          <Image
            src={"/img/postgres-logo.png"}
            // src={"/postgres.svg"}
            alt={`logo-${dbType}`}
            width={100}
            height={0}
          />
        )}
      </div>
      <Separator orientation="horizontal" className="h-6 mx-1" />
      <div className="flex items-center gap-1">
        <Database className="size-4" />
        <p className="text-sm">{schema?.name ?? "Database"}</p>
      </div>
    </div>
  );
}

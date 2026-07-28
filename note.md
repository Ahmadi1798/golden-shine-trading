to start minlo 
MINIO_ROOT_USER=minioadmin MINIO_ROOT_PASSWORD=minioadmin123 minio server "$HOME/minio-data" --address ":9000" --console-address ":9001"

Check MinIO health
curl -s -o /tmp/minio-health.txt -w "%{http_code}" http://127.0.0.1:9000/minio/health/live && echo && cat /tmp/minio-health.txt

Useful stop/restart commands

Stop MinIO
pkill -f "minio server"

Restart MinIO
pkill -f "minio server" || true
MINIO_ROOT_USER=minioadmin MINIO_ROOT_PASSWORD=minioadmin123 minio server "$HOME/minio-data" --address ":9000" --console-address ":9001"

Quick one-command starter (MinIO + app health check)

mkdir -p "$HOME/minio-data" && pkill -f "minio server" || true; MINIO_ROOT_USER=minioadmin MINIO_ROOT_PASSWORD=minioadmin123 nohup minio server "$HOME/minio-data" --address ":9000" --console-address ":9001" >/tmp/minio.log 2>&1 & sleep 2; curl -s -o minio-health.txt -w "%{http_code}" http://127.0.0.1:9000/minio/health/live && echo

    
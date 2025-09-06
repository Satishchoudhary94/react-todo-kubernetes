
# React Todo App on Kubernetes

This project is a simple React Todo application deployed on Kubernetes using Docker and NGINX.

## Project Structure

```
├── Dockerfile
├── k8s-deployment.yaml
├── package.json
├── public/
├── src/
└── ...
```

## Prerequisites
- Node.js and npm
- Docker
- Kubernetes (Minikube recommended for local testing)
- kubectl
- Docker Hub account (for pushing images)

## Steps to Deploy

### 1. Build the React App Docker Image
```
sudo docker build -t <your-dockerhub-username>/todo-react-app:latest .
```

### 2. Push the Image to Docker Hub
```
sudo docker push <your-dockerhub-username>/todo-react-app:latest
```

### 3. Update the Kubernetes Deployment YAML
Edit `k8s-deployment.yaml` and set the image field to your Docker image:
```
image: <your-dockerhub-username>/todo-react-app:latest
```

### 4. Start Minikube
```
minikube start
```

### 5. Apply the Kubernetes Deployment and Service
```
kubectl apply -f k8s-deployment.yaml
```

### 6. Check Pod and Service Status
```
kubectl get pods
kubectl get svc
```

### 7. Access the App in Browser
If using NodePort, get the URL with:
```
minikube service todo-react-service --url
```

### 8. Public Access (ngrok)
You can access your app publicly using ngrok:

**Public URL:** [https://e7b14b0a5c22.ngrok-free.app/](https://e7b14b0a5c22.ngrok-free.app/)

Share this link to let others access your deployed app.

Open the provided URL in your browser.

---

## Exposing Publicly (Optional)
For a public link, use [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/www/):
```
ngrok http 30080
```
Or deploy to Vercel/Netlify for static hosting.

---

## Troubleshooting
- If you see `connection refused`, check that your service ports match the container ports (usually 80 for NGINX).
- Use `kubectl logs <pod-name>` to see pod logs.
- Make sure Docker and Minikube are running and your user has Docker permissions.

---

## Credits
- React
- Vite
- Docker
- Kubernetes
- NGINX

---

For any issues, open an issue or contact the maintainer.

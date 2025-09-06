## 📦 How to Create a Kubernetes Deployment & Service (Step-by-Step)

### 1. Create a Deployment YAML
A Deployment manages your app’s pods and ensures the desired number are running. Here’s a sample for a React app:


```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
	name: todo-react-app
spec:
	replicas: 1
	selector:
		matchLabels:
			app: todo-react-app
	template:
		metadata:
			labels:
				app: todo-react-app
		spec:
			containers:
				- name: todo-react-app
					image: <your-dockerhub-username>/todo-react-app:latest
					ports:
						- containerPort: 80
```

**Explanation:**
- `replicas`: Number of pods to run
- `image`: Your Docker image (must be pushed to Docker Hub or a registry)
- `containerPort`: Port your app listens on inside the container (80 for NGINX)

---

### 2. Create a Service YAML
A Service exposes your pods to the network. For local access, use NodePort:


```yaml
apiVersion: v1
kind: Service
metadata:
	name: todo-react-service
spec:
	type: NodePort
	selector:
		app: todo-react-app
	ports:
		- protocol: TCP
			port: 80
			targetPort: 80
			nodePort: 30080
```

**Explanation:**
- `type: NodePort`: Exposes the service on a port on each node (here, 30080)
- `port`: The port the service exposes inside the cluster (80)
- `targetPort`: The port the pod/container listens on (80)
- `nodePort`: The external port you use to access the app (30080)

---

### 3. Save Both YAMLs
You can combine both into one file (like `k8s-deployment.yaml`) separated by `---`.

---

### 4. Apply the YAML to Create Resources
Run:
```bash
kubectl apply -f k8s-deployment.yaml
```
This will create the deployment and service in your cluster.

---

### 5. Check Status
See deployments, pods, and services:
```bash
kubectl get deployments
kubectl get pods
kubectl get svc
```

---

### 6. Update or Delete
To update after editing the YAML, run apply again:
```bash
kubectl apply -f k8s-deployment.yaml
```
To delete:
```bash
kubectl delete -f k8s-deployment.yaml
```

---


# React Todo App on Kubernetes — Step-by-Step Guide

This project demonstrates how to build, containerize, and deploy a React Todo app on Kubernetes using Docker, NGINX, and Minikube. It also shows how to expose your app publicly using ngrok.

---

## 📁 Project Structure

```
├── Dockerfile              # Docker build instructions
├── k8s-deployment.yaml     # Kubernetes Deployment & Service
├── package.json            # React dependencies & scripts
├── public/                 # Static files
├── src/                    # React source code
└── ...
```

---

## 🛠️ Prerequisites

- **Node.js & npm**: For building the React app
- **Docker**: For containerizing the app
- **Kubernetes**: Minikube (recommended for local testing)
- **kubectl**: To interact with Kubernetes
- **Docker Hub account**: To push your image (or use another registry)

---


## 🚦 Kubernetes Cluster Setup & Management

### A. Create a Kubernetes Cluster (Minikube)
Install Minikube if not already installed:
```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```
Start your cluster:
```bash
minikube start
```
Check cluster status:
```bash
minikube status
```

### B. Add a Deployment & Service
Apply your deployment and service YAML:
```bash
kubectl apply -f k8s-deployment.yaml
```
Check deployments:
```bash
kubectl get deployments
```
Check pods:
```bash
kubectl get pods
```
Check services:
```bash
kubectl get svc
```

### C. View Pod Logs
To see logs for a pod:
```bash
kubectl logs <pod-name>
```
To follow logs live:
```bash
kubectl logs -f <pod-name>
```

### D. Debugging Pods
Describe a pod for detailed info:
```bash
kubectl describe pod <pod-name>
```
Exec into a running pod (get a shell):
```bash
kubectl exec -it <pod-name> -- /bin/sh
```

---

## 🚀 Deployment Steps

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd <project-folder>
npm install
```

### 2. Build the Docker Image
Build your app and create a Docker image:
```bash
sudo docker build -t <your-dockerhub-username>/todo-react-app:latest .
```

### 3. Push the Image to Docker Hub
Login and push your image:
```bash
sudo docker login
sudo docker push <your-dockerhub-username>/todo-react-app:latest
```

### 4. Update the Kubernetes Deployment YAML
Edit `k8s-deployment.yaml` and set the image field:
```yaml
image: <your-dockerhub-username>/todo-react-app:latest
```

### 5. Start Minikube
Start your local Kubernetes cluster:
```bash
minikube start
```

### 6. Deploy to Kubernetes
Apply your deployment and service:
```bash
kubectl apply -f k8s-deployment.yaml
```

### 7. Check Pod & Service Status
Check if everything is running:
```bash
kubectl get pods
kubectl get svc
```
You should see your pod(s) running and a service of type NodePort (e.g., port 30080).

### 8. Access the App in Your Browser
Get the service URL:
```bash
minikube service todo-react-service --url
```
Open the provided URL in your browser.

### 9. Expose Publicly with ngrok
Install ngrok if needed:
```bash
npm install -g ngrok
```
Expose your Minikube NodePort (replace with your Minikube IP and NodePort):
```bash
minikube ip   # e.g., 192.168.49.2
ngrok http 192.168.49.2:30080
```
**Public URL:** [https://e7b14b0a5c22.ngrok-free.app/](https://e7b14b0a5c22.ngrok-free.app/)

Share this link to let others access your deployed app from anywhere.

---

## 🐞 Troubleshooting & Tips

- If you see `connection refused`, make sure your service ports match the container ports (usually 80 for NGINX, NodePort for external access).
- Use `kubectl logs <pod-name>` to see pod/container logs for errors.
- Make sure Docker and Minikube are running, and your user has Docker permissions (add to `docker` group if needed).
- If ngrok gives a 502 error, make sure you are tunneling to the correct Minikube IP and NodePort, not localhost.
- To redeploy after changes, rebuild the Docker image, push, and re-apply the YAML.

---


For any issues, open an issue or contact the maintainer.

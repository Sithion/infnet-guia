# Overview

Essa é uma aplicação para gerenciar seus estudos no Infnet.

## Getting Started
### Docker

A aplicação está configura para rodar com [Docker e Docker Compose](https://docs.docker.com/get-started/get-docker/).

Após instalar o docker engine:
```
# Rode esse comando - production mode
docker-compose up

# Rode esse comando - development mode (Nesse modo o desenvolvedor tem acesso a hotreload feature)
docker-compose up -f docker-compose.development.yaml
```

### CICD
Para CICD, o projeto faz uso do GitHub Actions, e para cada nova versão basta apenas trocar o valor da mesma no package.json. A Action irá automaticamente atribuir esse valor a tag da imagem que for gerada.
##### ⚠️ **Atenção:** Será necessário definir dois secrets, nas configurações do seu projeto no GitHub, com os valores necessários para acessar o seu docker hub: `DOCKER_USERNAME` & `DOCKER_PASSWORD`.

### Kubernetes
#### Minikube
Será necessario a instalação do [minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download) e do [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) no seu sistema operacional.

Após a instalação, inicie o minikube com o comando:
```
minikube start
```

##### Deployment
Todas as configurações do kubernetes estão fazendo uso do padrão kustomize. Para subir as configurações da aplicação, execute: 
``` 
kubectl apply -k k8s/app

# Redirecione a porta do service no minikupe para localhost:3000
kubectl port-forward svc/guia-app-service -n app 3000:3000
```
Após os comandos, teste se as configurações funcioram, acessando [Guia-App](http://localhost:3000).

##### ⚠️ **Atenção:** Se precisar ver o Dashboard do minikube, abra uma nova janela do terminal e rode o comando:
```
minikube dashboard
```

### Monitoring
A parte de monitoramento da aplicação está usando Prometheus e Grafana, para buscar as metricas da aplicação e disponibilizar em dashboards.

Para subir as configurações da monitoramento da aplicação, execute:
``` 
kubectl apply -k k8s/monitoring
```

##### ⚠️ **Atenção:** Para abrir o dashboard do grafana, abra uma nova janela do terminal e rode o comando:
```
minikube service grafana-service -n monitoring

# Usuário: admin
# Senha: test
```

### Automation
A parte de automação de testes da aplicação está bem simples apenas aplicando um teste de estresse em um endpoint da aplicação '/api/process'.

Para subir as configurações da automação de testes da aplicação, execute:
``` 
kubectl apply -k k8s/automation
```


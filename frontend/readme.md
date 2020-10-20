1. Development
    
    Run development server:
    ```c
    npm run dev:ssr
    ```
    Server will start at http://localhost:4200
2. Deploy with Docker
    
    Build:
    ```c
    docker build -t myvn/frontend .
    ```
    Run:
    ```c
    docker run -d -p 80:6000 -e "PORT=6000" -e "GOOGLE_MAP_API_KEY=AIzaSyACOLjTUMYHC2v02KnVKBEbX1-1oo4oTS0" myvn/frontend
    ```
    Server will start with your server configuration
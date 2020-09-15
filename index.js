const fs = require("fs");
const http = require("http");
const axios = require("axios");
const url = require("url");

const urlProveedores = "/api/proveedores";
const urlClientes = "/api/clientes";




let processProviders = (callback) => {
    const infoProvidersURL = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
    axios.get(infoProvidersURL).then(jsonResponse =>{
        fs.readFile("index.html", (err, data) => {
            let pageContent = data.toString();
            let providerTable = "<h1>Listado de proveedores</h1>\n";
            providerTable += "<table class = \"table-striped\" \"text-justify\">\n";
            providerTable += "<thead>\n<tr>\n<th>\nId\n</th>\n<th>\nNombre\n</th>\n<th>\nContacto\n</th>\n</tr>\n</thead>\n<tbody>\n";
            jsonResponse = jsonResponse.data;
            for(let i=0;i<jsonResponse.length;i++){
                providerTable += "<tr>\n";
                let providerId = jsonResponse[i].idproveedor;
                let providerName = jsonResponse[i].nombrecompania;
                let providerContact = jsonResponse[i].nombrecontacto;
                providerTable += "<td>"+providerId+"</td>\n";
                providerTable += "<td>"+providerName+"</td>\n";
                providerTable += "<td>"+providerContact+"</td>\n";
                providerTable += "</tr>\n";
            }
            providerTable += "</tbody>\n</table>\n";
            pageContent = pageContent.replace("{{tabla}}", providerTable);
            callback(pageContent);
        });
    }).catch(error => console.log(error));
    
};

let processClients = (callback) => {
    const infoClientsURL = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";
    axios.get(infoClientsURL).then(jsonResponse =>{
        fs.readFile("index.html", (err, data) => {
            let pageContent = data.toString();
            let clientTable = "<h1>Listado de clientes</h1>\n";
            clientTable += "<table class = \"table-striped\" \"text-justify\">\n";
            clientTable += "<thead>\n<tr>\n<th>\nId\n</th>\n<th>\nCompañia\n</th>\n<th>\nContacto\n</th>\n</tr>\n</thead>\n<tbody>\n";
            jsonResponse = jsonResponse.data;
            for(let i=0;i<jsonResponse.length;i++){
                clientTable += "<tr>\n";
                let clientId = jsonResponse[i].idCliente;
                let clientCompany = jsonResponse[i].NombreCompania;
                let clientContact = jsonResponse[i].NombreContacto;
                clientTable += "<td>"+clientId+"</td>\n";
                clientTable += "<td>"+clientCompany+"</td>\n";
                clientTable += "<td>"+clientContact+"</td>\n";
                clientTable += "</tr>\n";
            }
            clientTable += "</tbody>\n</table>\n";
            pageContent = pageContent.replace("{{tabla}}", clientTable);
            callback(pageContent);
        });
    }).catch(error => console.log(error));
    
};


http.createServer((req, res)=>{
    let requestUrl = url.parse(req.url, true);
    if(requestUrl.path === urlProveedores){
        processProviders((data) => {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data.toString());
        });
    }else if(requestUrl.path === urlClientes){
        processClients((data) => {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data.toString());
        });
    }
}).listen(8081);


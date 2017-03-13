# CreateOffice365Group
Creates an Office 365 Group using Node JS

## Preparando a solução pra rodar
Para a solução funcionar corretamente, é necessário criar um app no Azure e depois rodar um comando powershell para dar permissões de administrador para essa App.

Para gerar o **ClientID**, **ClientSecret**, siga os passos abaixo:

1. Abra o [portal de gerenciamento do Azure](https://manage.windowsazure.com/) e clique em Active Directory.
1. Escolha o domínio
![Domínio](https://cloud.githubusercontent.com/assets/12012898/9564863/dad31a90-4e8a-11e5-8708-24bc945ae095.png)
1. No menu superior, escolha **Aplicativos** e depois clique em **Adicionar**.
![Aplicativos](https://cloud.githubusercontent.com/assets/12012898/9564869/45595046-4e8b-11e5-9a83-84a34806ca5a.png)
1. Clique em **Adicionar uma aplicação que minha empresa esteja desenvolvendo**
![Aplicativo](https://cloud.githubusercontent.com/assets/12012898/9564874/8c06200a-4e8b-11e5-8cb2-f134fcf9dbfa.png)
1. Dê um nome para o seu aplicativo e escolha a opção Web API
![Nome](https://cloud.githubusercontent.com/assets/12012898/9564881/e8c1b08e-4e8b-11e5-80b6-cd0b0b179bad.png)
1. Digite uma URL para logon da aplicação (coloque a URL criada na primeita etapa) e uma URL que identificará a sua aplicação posteriormente (também poderá ser alterado depois).
![Identificação](https://cloud.githubusercontent.com/assets/12012898/9564880/e895684e-4e8b-11e5-9d4a-5de5bf65dd10.png)
1. Clique em configurar
![Configurar]("https://cloud.githubusercontent.com/assets/12012898/9565185/33786270-4e97-11e5-9f31-3c98f166f220.png)
1. Clique em URL de resposta e adicione a url da sua aplicação no Apache, Por exemplo, http://localhost. Em chaves, escolha 1 ano e em permissões, clique em **Adicionar Aplicativo** e escolha Office 365 SharePoint Online. Delegue as permissões necessárias para a sua aplicação e clique em salvar. Anote os valores de Client ID e Client Secret gerados.
![Configurações adicionais](https://cloud.githubusercontent.com/assets/12012898/9565194/56936778-4e97-11e5-8504-2aaa3e921fea.png)
1. Clique em Exibir pontos de entrada e copie a primeira URL. Nessa URL você verá o ID do tenant, no formato GUID.
![Pontos de Entrada](https://cloud.githubusercontent.com/assets/12012898/9565207/bdc359b2-4e97-11e5-8a48-78ade248fa84.png)
1. Após salvar o Client Secret aparecerá para você utilizar na aplicação

Após esses passos, pegue o **ClientID** gerado e substitua no script abaixo:

```powershell
Connect-MsolService
$ClientIdWebApp = 'ClientID'
$webApp = Get-MsolServicePrincipal -AppPrincipalId $ClientIdWebApp

Add-MsolRoleMember -RoleName "Company Administrator" -RoleMemberType ServicePrincipal -RoleMemberObjectId $webApp.ObjectId
```

Altere os dados no arquivo Config.js (https://github.com/RARomano/CreateOffice365Group/blob/master/config.js) com os valores criados nessa etapa.

## Dados adicionais
Os dados do grupo a ser criado estão no arquivo app.js, altere conforme sua necessidade.


```javascript
  graph.createGroup(token, "test group", true, "group-test", false).then(function(response) {
    console.log(response);
  });
```

> Para mais detalhes sobre os parâmetros e opções disponíveis, acesse a documentação https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/group_post_groups

### Rodando a solução
Instale as dependências com `npm install` e depois `node app`
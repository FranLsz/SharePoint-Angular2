<%-- Las 4 líneas siguientes son directivas ASP.NET necesarias cuando se usan componentes de SharePoint. --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- El marcado y el script del elemento Content siguiente se pondrá en el <head> de la página. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Agregue sus estilos CSS al siguiente archivo -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Agregue el código JavaScript al siguiente archivo -->

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pure/0.6.0/pure-min.css" />

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.33.3/es6-shim.min.js"></script>
    <script type="text/javascript" src="https://npmcdn.com/angular2@2.0.0-beta.9/es6/dev/src/testing/shims_for_IE.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.16/system-polyfills.js"></script>
    <script type="text/javascript" src="https://code.angularjs.org/2.0.0-beta.9/angular2-polyfills.js"></script>
    <script type="text/javascript" src="https://code.angularjs.org/tools/system.js"></script>
    <script type="text/javascript" src="https://code.angularjs.org/2.0.0-beta.9/Rx.js"></script>
    <script type="text/javascript" src="https://code.angularjs.org/2.0.0-beta.9/angular2.js"></script>
    <script type="text/javascript" src="https://code.angularjs.org/2.0.0-beta.9/http.js"></script>
    <script type="text/javascript" src="https://code.angularjs.org/2.0.0-beta.9/router.js"></script>


    <script type="text/javascript">
        ExecuteOrDelayUntilScriptLoaded(function() {
             System.config({
            map: {
                app: '../Scripts/angular2/app/'
            },
            packages: {
                app: {
                    format: 'register',
                    main: 'main',
                    defaultExtension: 'js'
                }
            }
        });

        System.import('app').catch(console.error.bind(console));

        }, "sp.js");
       

    </script>

    <!--<script type="text/javascript" src="../Scripts/App.js"></script>-->
</asp:Content>

<%-- El marcado del elemento Content siguiente se pondrá en el elemento TitleArea de la página. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>

<%-- El marcado y el script del elemento Content siguiente se pondrá en el <body> de la página. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <app-main></app-main>

</asp:Content>

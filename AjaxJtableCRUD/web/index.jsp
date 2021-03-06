<!DOCTYPE html>
<head>
    <title>CRUD operations using jTable</title>
    <!-- Include one of jTable styles. -->
    <link href="css/lightcolor/blue/jtable.css" rel="stylesheet" type="text/css" />
    <link href="css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-2.1.3.js" type="text/javascript"></script>
    <script src="js/jquery-ui.js" type="text/javascript"></script>
    <!-- Include jTable script file. -->
    <script src="js/jquery.jtable.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            $('#StudentTableContainer').jtable({
                title: 'Students List',
                saveUserPreferences: false, //disable cookie saving
                paging: true, //Enable paging
                pageSize: 8, //Set page size (default: 10)
                sorting: true, //Enable sorting
                defaultSorting: 'LAST_NAME ASC', //Set default sorting
                actions: {
                    listAction: 'Controller?action=list',
                    createAction: 'Controller?action=create',
                    updateAction: 'Controller?action=update',
                    deleteAction: 'Controller?action=delete'
                },
                toolbar: {
                    items: [{
                        tooltip: 'Click here to export this table to excel',
                        icon: 'css/lightcolor/excel.png',
                        text: 'Export to Excel',
                        click: function () {
                            alert('This item is just a demonstration for new toolbar feature. You can add your custom toolbar items here. Then, for example, you can download excel file from server when user clicks this item. See toolbar in API reference documentation for usage.');
                        }
                    }]
                },
                fields: {
                    LAST_NAME: {
                        title: 'Last Name',
                        width: '20%',
                        
                        list: true,
                        edit: true
                    },
                    FIRST_NAME: {
                        title: 'First Name',
                        width: '30%',
                        edit: true
                    },
                    PSU_ID: {
                        title: 'PSU ID',
                        width: '20%',
                        key: true,
                        edit: false,
                        create: true
                    },
                    TEAM: {
                        title: 'Team',
                        width: '30%',
                        edit: true,
                        sorting: false //This column is not sortable!
                    }
                }
            });
            $('#StudentTableContainer').jtable('load');
        });
    </script>

</head>
<body>
    <div style="width: 80%; margin-right: 10%; margin-left: 10%; text-align: center;">

        <h4>AJAX based CRUD operations using jQuery.jTable</h4>
        <div id="StudentTableContainer"></div>
    </div>
</body>
</html>
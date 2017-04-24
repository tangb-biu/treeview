## treeview

### description
>a tree plugin

### dependencies
> jquery 1.7 +

### examples
    <script src="jquery-1.11.2.min.js"></script> 
    <script src="jquery.treeview.js"></script> 
    <script type="text/javascript">
        var opt = {
          data : {
            name:'1',
            children: [
              {
                name:'11',
                children: [
                  {
                    name:'111',
                  },
                  {
                    name: '112'
                  }
                ]
              },
              {
                name:'13',
              }
            ]
          },
          /**
           * click envent handler
           * @param: {
           *    jqdom: the click taget ,
           *    name: the text,
           *    id: dom id,
           *    status: Expand or close
           * }
           */
          onClick: function(jqdom, name, id, status) {
            console.log(jqdom);
            console.log(name);
            console.log(id);
            console.log(status);
          },
          /**
           * click envent handler
           * @param: {
           *    jqdom: the click taget ,
           *    name: the text,
           *    children: the data under the target
           * }
           */
          onDel: function(jqdom, name, children){
            console.log(jqdom);
            console.log(name);
            console.log(children);
          }
        }
        $("body").treeView(opt);
        </script>
#### [click me](https://tangb-biu.github.io/treeview/index.html) to view the example.

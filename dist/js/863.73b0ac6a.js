"use strict";(self["webpackChunkmevn_project_frontend"]=self["webpackChunkmevn_project_frontend"]||[]).push([[863],{2749:function(e,t,a){a.d(t,{Z:function(){return c}});var s=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"row mt-4"},[t("div",{staticClass:"col-sm-1 pull-right"},[t("b-icon",{staticClass:"icon-size-l pull-left text-color-red",attrs:{icon:"exclamation-circle"}})],1),e._m(0)])])},i=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"col-sm-11 mt-3"},[t("h4",{staticClass:"text-color-red text-color-red pull-left"},[e._v(" No se encontraron resultados. Por favor, ingresá nuevos parámetros de búsqueda. ")])])}],r={name:"ResultsNotFounded",props:{}},l=r,o=a(1001),n=(0,o.Z)(l,s,i,!1,null,null,null),c=n.exports},9863:function(t,a,s){s.r(a),s.d(a,{default:function(){return P}});var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("h1",{staticClass:"my-2"},[e._v("Categorías")]),t("div",{staticClass:"border-shadow p-4"},["Consultar Categorias"===e.categoriesOperation?t("div",[t("ReadCategories")],1):e._e(),"Agregar Categoria"===e.categoriesOperation?t("div",[t("NewCategory")],1):e._e(),"Cargar Categorias"===e.categoriesOperation?t("div"):e._e()])])},r=[],l=s(629),o=function(){var e=this,t=e._self._c;return t("div",[t("b-overlay",{attrs:{show:e.showOverlay,rounded:"sm"}},[t("div",{staticClass:"row my-2"},[t("label",{staticClass:"control-label",attrs:{id:"searchedEmail"}},[e._v("Buscar como")]),t("div",{staticClass:"col-2"},[t("div",{staticClass:"form-group"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.searchByFilterSelected,expression:"searchByFilterSelected"}],staticClass:"form-select",attrs:{id:"selectTypeSearch"},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.searchByFilterSelected=t.target.multiple?a:a[0]}}},e._l(e.searchByFilters,(function(a,s){return t("option",{key:s,domProps:{value:a}},[e._v(" "+e._s(a.description)+" ")])})),0)])]),t("div",{staticClass:"col-xs-12 col-sm-6"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.inputFilter,expression:"inputFilter"}],class:[e.errorInputFilterRequired?"form-control is-invalid":"form-control"],attrs:{type:"text",placeholder:e.textPlaceholder,maxlength:"100"},domProps:{value:e.inputFilter},on:{input:function(t){t.target.composing||(e.inputFilter=t.target.value)}}}),e.errorInputFilterRequired?t("small",[e._v("Es un campo requerido")]):e._e()]),t("div",{staticClass:"col-xs-12 col-sm-4",staticStyle:{"text-align":"left"}},[t("b-button",{attrs:{variant:"primary",type:"submit"},on:{click:function(t){return e.getCategoriesFiltered()}}},[e._v("Buscar")])],1)]),t("div",{staticClass:"row"},[t("label",[e._v("Estado:")]),t("div",{staticClass:"radio-group"},[t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.statusSelected,expression:"statusSelected"}],attrs:{type:"radio",value:"2"},domProps:{checked:e._q(e.statusSelected,"2")},on:{change:function(t){e.statusSelected="2"}}}),e._v(" Todos ")]),t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.statusSelected,expression:"statusSelected"}],staticClass:"margin-left",attrs:{type:"radio",value:"1"},domProps:{checked:e._q(e.statusSelected,"1")},on:{change:function(t){e.statusSelected="1"}}}),e._v(" Activo ")]),t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.statusSelected,expression:"statusSelected"}],staticClass:"margin-left",attrs:{type:"radio",value:"0"},domProps:{checked:e._q(e.statusSelected,"0")},on:{change:function(t){e.statusSelected="0"}}}),e._v(" No Activo ")])])]),t("hr"),t("div",{staticClass:"row"},[t("p",{staticClass:"mb-1"},[t("em",[e._v("Mostrando "+e._s(e.totalRowsFiltered)+" de "+e._s(e.totalRows)+" registros encontrados")])])]),e.categories.length>0?t("div",[t("b-table",{ref:"categoriesTable",staticClass:"margin-bottom",attrs:{busy:e.isBusy,items:e.categories,fields:e.fields,bordered:!0,"table-variant":"warning","current-page":e.currentPage,"per-page":e.pageSize,responsive:"sm"},on:{"update:busy":function(t){e.isBusy=t}},scopedSlots:e._u([{key:"cell(name)",fn:function(a){return[a.item.hasChildren?t("div",[t("u",[t("span",{staticClass:"link",on:{click:function(t){return e.showCategoryDetail(a.item,a.index,t.target)}}},[e._v(e._s(a.item.name))])])]):t("div",[e._v(e._s(a.item.name))])]}},{key:"cell(operations)",fn:function(a){return[t("div",{staticClass:"pull-center"},[t("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.delete-modal",modifiers:{"delete-modal":!0}}],staticClass:"btn-danger",attrs:{size:"sm"},on:{click:function(t){return e.showModal(a.item,a.index,t.target)}}},[e._v(" Eliminar "),t("b-icon-trash")],1)],1)]}},{key:"cell(price)",fn:function(a){return[t("span",[e._v("$")]),e._v(e._s(a.item.price)+" ")]}},{key:"cell(isActive)",fn:function(a){return[t("div",{staticClass:"pull-center mt-2"},[a.item.isActive?e._e():t("b-icon-x"),a.item.isActive?t("b-icon-check2"):e._e()],1)]}}],null,!1,3515871900)}),t("b-modal",{attrs:{id:e.deleteModal.id,title:e.deleteModal.title,centered:"","hide-header-close":"","header-bg-variant":"primary","header-text-variant":"light"},on:{ok:e.removeProduct}},[t("span",[e._v(e._s(e.deleteModal.content))])]),t("b-modal",{attrs:{id:e.categoryDetailModal.id,title:e.categoryDetailModal.title,centered:"","hide-header-close":"","header-bg-variant":"primary","header-text-variant":"light"},on:{ok:e.removeProduct}},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-sm-6"},[t("label",{staticClass:"control-label",attrs:{id:"productName"}},[e._v("Nombre")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.categorySelected.name,expression:"categorySelected.name"}],staticClass:"form-control",class:[e.errorNameRequired?"is-invalid":""],attrs:{type:"text",placeholder:"Ingresá el Nombre",maxlength:"100"},domProps:{value:e.categorySelected.name},on:{input:function(t){t.target.composing||e.$set(e.categorySelected,"name",t.target.value)}}}),e.errorNameRequired?t("small",[e._v("Es un campo requerido")]):e._e()]),t("div",{staticClass:"col-sm-6"},[t("label",{staticClass:"control-label",attrs:{id:"productName"}},[e._v("Padre")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.categorySelected.hierarchicalName,expression:"categorySelected.hierarchicalName"}],staticClass:"form-control",class:[e.errorParentRequired?"is-invalid":""],attrs:{type:"text",placeholder:"Ingresá el Nombre",maxlength:"100"},domProps:{value:e.categorySelected.hierarchicalName},on:{input:function(t){t.target.composing||e.$set(e.categorySelected,"hierarchicalName",t.target.value)}}}),e.errorNameRequired?t("small",[e._v("Es un campo requerido")]):e._e()])])]),t("b-pagination",{staticClass:"my-0",attrs:{"total-rows":e.totalRowsFiltered,"per-page":e.pageSize,align:"fill",size:"sm"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1):e._e(),e.noResultsFounded?t("ResultsNotFounded"):e._e()],1)],1)},n=[],c=s(2749),d={components:{ResultsNotFounded:c.Z},delimiters:["${","}"],data(){return{categories:[],categoriesChildren:[],categorySelected:{},isBusy:!1,showOverlay:!1,options:[{text:"Todos",value:2},{text:"Activo",value:1},{text:"No Activo",value:0}],statusSelected:2,searchByFilterSelected:{id:1,description:"Nombre",label:"c.name"},searchByFilters:[{id:1,description:"Nombre",label:"c.name"}],inputFilter:"",textPlaceholder:"Ingresá la Descripción",appliedFilter:"Nombre",fields:[{key:"id",label:"Id"},{key:"name",label:"Descripción"},{key:"hierarchicalName",label:"Descripción Jerárquica"},{key:"isActive",label:"Activo"},{key:"operations",label:""}],currentPage:1,totalRowsFiltered:0,totalRows:0,pageSize:15,inputFilter:"",errorInputFilterRequired:!1,noResultsFounded:!1,deleteModal:{id:"delete-modal",title:"Eliminar Producto",content:"¿Estás seguro que deseas eliminar este elemento?"},categoryDetailModal:{id:"category-detail-modal",title:"Detalle de Categoría",content:"Contenido"},errorNameRequired:!1,errorParentRequired:!1,errorStatusRequired:!1,statusCode:null}},async mounted(){await this.getAllCategories(),this.getAllChildrenCategories()},created(){},methods:{showModal(e,t,a){this.$root.$emit("bv::show::modal",this.deleteModal.id,a),this.categorySelected=e?.id},showCategoryDetail(e,t,a){this.$root.$emit("bv::show::modal",this.categoryDetailModal.id,a),console.log(e),this.categorySelected=e},closeTag(){},async getCategoriesFiltered(){if(this.validateFields()){this.showOverlay=!0,this.isBusy=!0;let e="/categories",t={searchBy:this.searchByFilterSelected.label,query:this.inputFilter,status:this.statusSelected};await this.axios.get(e,{params:t}).then((e=>{this.categories=e?.data,this.totalRowsFiltered=e?.data?.length,0===this.totalRowsFiltered?this.noResultsFounded=!0:this.noResultsFounded=!1})).catch((e=>{this.showNotification("error","No fue posible cargar los Productos. Error: "+e)})).finally((e=>{this.showOverlay=!1,this.isBusy=!1}))}},async getAllCategories(){this.showOverlay=!0,this.isBusy=!0;let e="/categories";await this.axios.get(e).then((e=>{this.categories=e.data,this.totalRows=this.totalRowsFiltered=e.data.length,0===this.totalRowsFiltered?this.noResultsFounded=!0:this.noResultsFounded=!1})).catch((e=>{this.showNotification("error","No fue posible cargar los Productos. Error: "+e)})).finally((e=>{this.showOverlay=!1,this.isBusy=!1}))},getAllChildrenCategories(){let e=this.categories.filter((e=>e.hasChildren)),t=e.map((e=>e.id));this.categoriesChildren=this.categories.filter((e=>t.includes(e.id)))},validateFields(){let e=!0;return this.errorInputFilterRequired=!1,""===this.inputFilter&&(this.errorInputFilterRequired=!0,e=!1),e},showNotification(e,t){this.$toasted.show(t,{duration:3e3,type:e,theme:"bubble",singleton:!0,action:{text:"X",onClick:(e,t)=>{t.goAway(0)}}})},removeProduct(){let t=this.categories.findIndex((e=>e.id===this.categorySelected));-1!==t?this.categories.splice(t,1):this.showNotification("error","No fue posible eliminar el registro elegido"+e)}},computed:{},watch:{searchByFilterSelected:function(e,t){e!==t&&(1!==this.searchByFilterSelected.id&&2!==this.searchByFilterSelected.id||(this.textPlaceholder="Ingresá la Descripción"))},currentPage:async function(e,t){}}},u=d,h=s(1001),m=(0,h.Z)(u,o,n,!1,null,null,null),g=m.exports,v=function(){var e=this,t=e._self._c;return t("div",[t("h3",{staticClass:"my-3"},[e._v("Ingresá los datos de la Categoría")]),t("h4",{staticClass:"my-3"},[e._v("Atributos generales")]),t("form",{on:{submit:function(e){e.preventDefault()}}},[t("div",{staticClass:"row my-2"},[t("div",{staticClass:"col-sm-6"},[t("label",{staticClass:"control-label",attrs:{id:"productName"}},[e._v("Nombre")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.category.name,expression:"category.name"}],staticClass:"form-control",class:[e.errorNameRequired?"is-invalid":""],attrs:{type:"text",placeholder:"Ingresá el Nombre",maxlength:"100"},domProps:{value:e.category.name},on:{input:function(t){t.target.composing||e.$set(e.category,"name",t.target.value)}}}),e.errorNameRequired?t("small",[e._v("Es un campo requerido")]):e._e()])]),t("div",{staticClass:"row my-2"},[t("div",{staticClass:"col-sm-3"},[t("label",[e._v("Estado:")]),t("div",{staticClass:"radio-group"},[t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.statusSelected,expression:"statusSelected"}],attrs:{type:"radio"},domProps:{value:!0,checked:e._q(e.statusSelected,!0)},on:{change:function(t){e.statusSelected=!0}}}),e._v(" Activo ")]),t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.statusSelected,expression:"statusSelected"}],staticClass:"margin-left",attrs:{type:"radio"},domProps:{value:!1,checked:e._q(e.statusSelected,!1)},on:{change:function(t){e.statusSelected=!1}}}),e._v(" No Activo ")])])])]),t("hr"),t("div",{staticClass:"row my-2"},[t("div",{staticClass:"col-sm-12"},[t("h4",{staticClass:"m-0"},[e._v("Imagen "),e.showImage?e._e():t("b-icon-plus-circle",{staticClass:"margin-left pointer",attrs:{variant:"success"},on:{click:function(t){return e.handleImagenSection(!0)}}}),e.showImage?t("b-icon-dash-circle",{staticClass:"margin-left pointer",attrs:{variant:"danger"},on:{click:function(t){return e.handleImagenSection(!1)}}}):e._e()],1)])]),e.showImage?t("div",{staticClass:"row"},[t("div",{staticClass:"col-sm-6"},[t("b-form-file",{ref:"file-input",staticClass:"border-shadow",attrs:{placeholder:"",accept:".jpg, .png"},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}})],1)]):e._e(),t("hr"),t("div",{staticClass:"row my-2"},[t("div",{staticClass:"col-sm-12"},[t("h4",{staticClass:"m-0"},[e._v("Categoría padre "),e.showParentCategory?e._e():t("b-icon-plus-circle",{staticClass:"margin-left pointer",attrs:{variant:"success"},on:{click:function(t){return e.handleParentCategorySection(!0)}}}),e.showParentCategory?t("b-icon-dash-circle",{staticClass:"margin-left pointer",attrs:{variant:"danger"},on:{click:function(t){return e.handleParentCategorySection(!1)}}}):e._e()],1)])]),e.showParentCategory?t("div",{staticClass:"row"},[t("Autocomplete",{attrs:{options:e.categories},on:{"result-selected":e.handleResultSelected}})],1):e._e(),t("hr"),t("div",{staticClass:"col-sm-12"},[t("h4",{staticClass:"m-0"},[e._v("Categorías hijas "),t("b-icon-plus-circle",{staticClass:"margin-left pointer",attrs:{variant:"success"},on:{click:function(t){return e.handleChildren(!0)}}}),t("b-icon-dash-circle",{staticClass:"margin-left pointer",attrs:{variant:e.removeChildrenVariant},on:{click:function(t){return e.removeChildren(!1)}}})],1)]),e._l(e.children,(function(a){return t("div",{key:a.id,staticClass:"row mt-2"},[a.isActive?t("div",{staticClass:"col-sm-2"},[t("label",{staticClass:"control-label",attrs:{id:"categoryChildrenName"}},[e._v("Nombre")]),t("input",{directives:[{name:"model",rawName:"v-model",value:a.name,expression:"children.name"}],staticClass:"form-control",class:[e.errorChildrenCategoryNameRequired?"is-invalid":""],attrs:{disabled:a.isDisabled,placeholder:"Ingresá la Nombre",type:"text"},domProps:{value:a.name},on:{input:function(t){t.target.composing||e.$set(a,"name",t.target.value)}}}),e.errorChildrenCategoryNameRequired?t("small",[e._v("Es un campo requerido")]):e._e()]):e._e(),a.isActive?t("div",{staticClass:"col-sm-4"},[a.isDisabled?e._e():t("b-button",{staticClass:"mt-4",attrs:{variant:"primary",type:"submit"},on:{click:function(t){return e.addChildren(a)}}},[t("b-icon-save",{staticClass:"margin-right"}),e._v(" Agregar ")],1)],1):e._e()])})),t("div",{staticClass:"pull-right"},[t("b-button",{attrs:{variant:"primary",type:"submit"},on:{click:function(t){return e.postAddCategory()}}},[e._v("Guardar")])],1)],2)])},p=[],C=function(){var e=this,t=e._self._c;return t("div",{staticClass:"search-container col-sm-4"},[t("div",{staticClass:"search-input-container"},[t("b-input-group",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.searchQuery,expression:"searchQuery"}],staticClass:"search-input form-control",attrs:{type:"text",placeholder:"Ingresá el Nombre",disabled:e.selectedResult},domProps:{value:e.searchQuery},on:{input:[function(t){t.target.composing||(e.searchQuery=t.target.value)},e.handleInput],keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.clearResults.apply(null,arguments)}}})])],1),e.searchResults.length>0?t("div",{staticClass:"search-dropdown"},e._l(e.searchResults,(function(a,s){return t("div",{key:a.id,staticClass:"dropdown-item p-1",on:{click:function(t){return e.selectResult(a)}}},[t("span",[e._v(e._s(a.name))]),0===s?t("button",{staticClass:"close-results",on:{click:e.closeResults}}):e._e()])})),0):e.options.length<=0?t("div",{staticClass:"no-results"},[e._v(" No se encontraron resultados. ")]):e._e()])},y=[],f={name:"Autocomplete",props:{options:Array},data(){return{searchQuery:"",searchResults:[],selectedResult:!1}},methods:{async handleInput(){this.searchResults=this.options.filter((e=>e.name.toLowerCase().includes(this.searchQuery.toLowerCase())))},search(){},clearResults(){this.searchResults=[]},selectResult(e){this.selectedResult=!0,this.searchQuery=e.name,this.searchResults=[],this.$emit("result-selected",e)},closeResults(){this.selectedResult=!1}},computed:{}},b=f,_=(0,h.Z)(b,C,y,!1,null,null,null),w=_.exports,N={components:{Autocomplete:w},data(){return{errorNameRequired:!1,errorChildrenCategoryNameRequired:!1,errorParentCategoryNameRequired:!1,categories:[],category:{name:"Categoria de prueba",isActive:!0,image:null,hasChildren:!1,parentId:null,parentName:null,children:[{name:"Hijo 1"}]},children:[{id:0,name:null,isActive:!1,isDisabled:!1},{id:1,name:null,isActive:!1,isDisabled:!1},{id:2,name:null,isActive:!1,isDisabled:!1},{id:3,name:null,isActive:!1,isDisabled:!1},{id:4,name:null,isActive:!1,isDisabled:!1}],file:null,statusSelected:!0,showImage:!1,showParentCategory:!1,parentCategorySelected:1,parentCategoryDisabled:!1,removeChildrenVariant:"outline-dark"}},async created(){await this.getAllCategories()},methods:{...(0,l.nv)(["convertToJSON"]),async getAllCategories(){this.showOverlay=!0;let e="/categories";await this.axios.get(e).then((e=>{this.categories=e.data,console.log(this.categories)})).catch((e=>{this.showNotification("error","No fue posible cargar las Categorías. Error: "+e)})).finally((e=>{this.showOverlay=!1}))},onSelectedOption(e){console.log("Selected:",e)},handleResultSelected(e){this.category.parentId=e.id.toString(),this.category.parentName=e.name},cleanFile(){this.$refs["file-input"].reset()},cleanCategory(){this.category={name:"",status:2,image:null,hasChildren:!1,parentId:null,parentName:null,children:[]},this.removeChildren(!1),this.handleParentCategorySection(!1)},handleImagenSection(e){this.showImage=e,e||this.cleanFile()},handleParentCategorySection(e){this.showParentCategory=e,e||this.cleanParentCategory()},cleanParentCategory(){this.parentCategoryDisabled=this.errorParentCategoryNameRequired=!1,this.category.parentId=null,this.category.parentName=null},cleanChildren(){this.children=this.children.map((e=>({...e,name:null})))},handleChildren(e){let t=this.children.find((e=>!e.isActive));void 0!==t?(this.removeChildrenVariant="danger",t.isActive=e):this.showNotification("error","Solo es posible asociar 5 Atributos personalizados ")},removeChildren(e){let t=this.children.find((e=>e.isActive));void 0!==t&&t.isActive&&(t.isActive=e,t.isDisabled=e,this.checkChildren())},checkChildren(){let e=this.children.find((e=>e.isActive));void 0===e?(this.cleanChildren(),this.removeChildrenVariant="outline-dark"):this.removeChildrenVariant="danger"},addChildren(e){let t=this.validateChildren(e);t&&(this.category.children.push(e),e.isDisabled=!0)},async postAddCategory(){let e=!0,t=this.children.filter((e=>e.isActive));if(this.showParentCategory&&(e=this.validateParentCategory()),t.length>0?t=this.validateChildrenCategories():this.category.children=null,e&&t){let e=this.validateFields();if(e){this.category.hasChildren=this.category.children?.length>0,console.log(this.category);let e={category:this.category};await this.axios.post("/categories",e).then((e=>{this.cleanCategory(),this.showNotification("success","Se guardó correctamente la Categoría")})).catch((e=>{this.showNotification("error","No fue posible guardar la Categoría. Error: "+e.Message)})).finally((e=>{}))}}},validateParentCategory(){let e=!0;return e},validateFields(){let e=!0;return null===this.category.name||""===this.category.name?(this.errorNameRequired=!0,e=!1):this.errorNameRequired=!1,e},validateChildren(e){let t=!0;return null===e.name?(this.errorChildrenCategoryNameRequired=!0,t=!1):this.errorChildrenCategoryNameRequired=!1,t},validateChildrenCategories(){let e=!0,t=this.children.filter((e=>e.isActive&&null!==e.name));return t.length>0&&(this.category.children=t.map((e=>({name:e.name})))),e},showNotification(e,t){this.$toasted.show(t,{duration:3e3,type:e,theme:"bubble",singleton:!0,action:{text:"X",onClick:(e,t)=>{t.goAway(0)}}})}},watch:{statusSelected:function(){this.category.isActive=this.statusSelected}},computed:{}},S=N,R=(0,h.Z)(S,v,p,!1,null,null,null),x=R.exports,k={components:{ReadCategories:g,NewCategory:x},data(){return{}},created(){console.log(this.categoriesOperation)},methods:{},computed:{...(0,l.Se)({categoriesOperation:"getCategoriesOperation"})}},F=k,A=(0,h.Z)(F,i,r,!1,null,null,null),P=A.exports}}]);
//# sourceMappingURL=863.73b0ac6a.js.map
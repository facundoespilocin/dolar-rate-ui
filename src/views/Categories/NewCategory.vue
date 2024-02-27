<template>
    <div>
        <h3 class="my-3">Ingresá los datos de la Categoría</h3>

        <h4 class="my-3">Atributos generales</h4>

        <form v-on:submit.prevent="">
            <div class="row my-2">
                <div class="col-sm-6">
                    <label id="productName" class="control-label">Nombre</label>
                    <input 
                        type="text"
                        class="form-control"
                        :class="[errorNameRequired ? 'is-invalid' : '']"
                        placeholder="Ingresá el Nombre"
                        maxlength="100"
                        v-model="category.name">
                    <small v-if="errorNameRequired">Es un campo requerido</small>
                </div>
            </div>

            <div class="row my-2">
                <div class="col-sm-3">
                    <label>Estado:</label>
                    <div class="radio-group">
                        <label>
                            <input type="radio" :value=true class="" v-model="statusSelected" /> Activo
                        </label>

                        <label>
                            <input type="radio" :value=false class="margin-left" v-model="statusSelected" /> No Activo
                        </label>
                    </div>
                </div>
            </div>

            <hr>

            <div class="row my-2">
                <div class="col-sm-12">
                    <h4 class="m-0">Imagen
                        <b-icon-plus-circle 
                            class="margin-left pointer"
                            variant="success"
                            v-on:click="handleImagenSection(true)"
                            v-if="!showImage">
                        </b-icon-plus-circle>
                        <b-icon-dash-circle
                            class="margin-left pointer"
                            variant="danger"
                            v-on:click="handleImagenSection(false)"
                            v-if="showImage">
                        </b-icon-dash-circle> 
                    </h4>
                </div>
            </div>

            <div class="row" v-if="showImage">
                <div class="col-sm-6">
                    <b-form-file 
                        v-model="file"
                        ref="file-input"
                        class="border-shadow"
                        placeholder=""
                        accept=".jpg, .png">
                    </b-form-file>
                </div>
            </div>

            <hr>

            <div class="row my-2">
                <div class="col-sm-12">
                    <h4 class="m-0">Categoría padre 
                        <b-icon-plus-circle 
                            class="margin-left pointer"
                            variant="success"
                            v-on:click="handleParentCategorySection(true)"
                            v-if="!showParentCategory">
                        </b-icon-plus-circle>
                        <b-icon-dash-circle
                            class="margin-left pointer"
                            variant="danger"
                            v-on:click="handleParentCategorySection(false)"
                            v-if="showParentCategory">
                        </b-icon-dash-circle> 
                    </h4>
                </div>
            </div>

            <div class="row" v-if="showParentCategory">
                <Autocomplete :options="categories" @result-selected="handleResultSelected"></Autocomplete>
            </div>

            <hr>

            <div class="col-sm-12">
                <h4 class="m-0">Categorías hijas 
                    <b-icon-plus-circle 
                        class="margin-left pointer"
                        variant="success"
                        v-on:click="handleChildren(true)">
                    </b-icon-plus-circle>
                    <b-icon-dash-circle
                        class="margin-left pointer"
                        :variant="removeChildrenVariant"
                        v-on:click="removeChildren(false)">
                    </b-icon-dash-circle> 
                </h4>
            </div>

            <div class="row mt-2" v-for="children in children" :key="children.id">
                <div class="col-sm-2" v-if="children.isActive">
                    <label id="categoryChildrenName" class="control-label">Nombre</label>
                    <input 
                        class="form-control"
                        :class="[errorChildrenCategoryNameRequired ? 'is-invalid' : '']"
                        :disabled="children.isDisabled"
                        placeholder="Ingresá la Nombre"
                        type="text"
                        v-model="children.name">
                    <small v-if="errorChildrenCategoryNameRequired">Es un campo requerido</small>
                </div>

                <div class="col-sm-4" v-if="children.isActive">
                    <b-button 
                        class="mt-4"
                        variant="primary"
                        type="submit"
                        v-on:click="addChildren(children)"
                        v-if="!children.isDisabled">
                        <b-icon-save class="margin-right"></b-icon-save>
                            Agregar
                    </b-button>
                </div>
            </div>

            <div class="pull-right">
                <b-button variant="primary" type="submit" v-on:click="postAddCategory()">Guardar</b-button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex"
import "@/assets/style.css"
import Autocomplete from '@/components/Autocomplete/Autocomplete.vue'

export default {
    components: {
        Autocomplete
    },
    data() {
        return {
            errorNameRequired: false,
            errorChildrenCategoryNameRequired: false,
            errorParentCategoryNameRequired: false,

            categories: [],
            category: {
                name: "Categoria de prueba",
                isActive: true,
                image: null,
                hasChildren: false,
                parentId: null,
                parentName: null,
                children: [
                    {
                        name: "Hijo 1",
                    }
                ],
            },

            // category: {
            //     name: null,
            //     status: 2,
            //     image: null,
            //     children: null
            // },

            children: [
                {
                    id: 0,
                    name: null,
                    isActive: false,
                    isDisabled: false,
                },
                {
                    id: 1,
                    name: null,
                    isActive: false,
                    isDisabled: false,
                },
                {
                    id: 2,
                    name: null,
                    isActive: false,
                    isDisabled: false,
                },
                {
                    id: 3,
                    name: null,
                    isActive: false,
                    isDisabled: false,
                },
                {
                    id: 4,
                    name: null,
                    isActive: false,
                    isDisabled: false,
                }
            ],

            file: null,

            statusSelected: true,
            showImage: false,
            showParentCategory: false,
            parentCategorySelected: 1,
            parentCategoryDisabled: false,
            removeChildrenVariant: "outline-dark",
        }
    },

    async created() { 
        await this.getAllCategories();
    },

    methods: {
        ...mapActions(['convertToJSON']),

        async getAllCategories() {
            this.showOverlay = true;

            let resource = "/categories";

            await this.axios.get(resource)
            .then(res => {
                this.categories = res.data;
                console.log(this.categories);
            })
            .catch(e => {
                this.showNotification("error", "No fue posible cargar las Categorías. Error: " + e);
            })
            .finally(e => {
                this.showOverlay = false;
            })
        },

        onSelectedOption(option) {
            console.log("Selected:", option);
        },

        handleResultSelected(result) {
            // Actualizar el resultado seleccionado en la vista
            this.category.parentId = result.id.toString(); 
            this.category.parentName = result.name; 
        },

        cleanFile() {
            this.$refs['file-input'].reset();
        },

        cleanCategory() {
            this.category = {
                name: "",
                status: 2,
                image: null,
                hasChildren: false,
                parentId: null,
                parentName: null,
                children: [],
            }

            this.removeChildren(false);
            this.handleParentCategorySection(false);
        },

        handleImagenSection(show) {
            this.showImage = show;

            if (!show) {
                this.cleanFile();
            }
        },

        handleParentCategorySection(show) {
            this.showParentCategory = show;

            if (!show) {
                this.cleanParentCategory();
            }
        },

        cleanParentCategory() {
            this.parentCategoryDisabled = this.errorParentCategoryNameRequired = false;

            this.category.parentId = null;
            this.category.parentName = null;
        },

        cleanChildren() {
            this.children = this.children.map(i => ({
                ...i,
                name: null,
            }));
        },

        handleChildren(show) {
            let item = this.children.find(ca => !ca.isActive);
            
            if (item !== undefined) {
                this.removeChildrenVariant = "danger";
                item.isActive = show;
            } else {
                this.showNotification("error", "Solo es posible asociar 5 Atributos personalizados ");
            }
        },

        removeChildren(status) {
            let item = this.children.find(ca => ca.isActive);

            if (item !== undefined) {
                if (item.isActive) {
                    item.isActive = status;
                    item.isDisabled = status;
                    this.checkChildren();
                }
            }
        },

        checkChildren() {
            let result = this.children.find(ca => ca.isActive);

            if (result === undefined) {
                this.cleanChildren();
                this.removeChildrenVariant = "outline-dark";
            } else {
                this.removeChildrenVariant = "danger";
            }
        },

        addChildren(item) {
            let isValid = this.validateChildren(item);
            
            if (isValid) {
                this.category.children.push(item);
                item.isDisabled = true;
            }
        },

        async postAddCategory() {
            // let config = {
            //     headers: {
            //         Authorization: this.token
            //     }
            // }

            //this.axios.post("/cadets", this.cadet, config)
            let parentCategoryValidation = true;
            let childrenCategoriesValidation = this.children.filter(i => i.isActive);

            // ParentCategory validation
            if (this.showParentCategory) {
                parentCategoryValidation = this.validateParentCategory();
            }

            // ChildrenCategories validation
            if (childrenCategoriesValidation.length > 0) {
                childrenCategoriesValidation = this.validateChildrenCategories();
            } else {
                this.category.children = null;
            }

            if (parentCategoryValidation && childrenCategoriesValidation) {
                let validateForm = this.validateFields();
                
                if (validateForm) {
                    this.category.hasChildren = this.category.children?.length > 0 ? true : false;
                    console.log(this.category);
                    let body = {
                        category: this.category
                    }

                    await this.axios.post("/categories", body)
                    .then(res => {
                        this.cleanCategory();
                        this.showNotification("success", "Se guardó correctamente la Categoría");
                    })
                    .catch(e => {                    
                        this.showNotification("error", "No fue posible guardar la Categoría. Error: " + e.Message);
                    })
                    .finally(e => {
                    })
                }
            }
        },

        validateParentCategory() {
            let result = true;
            
            // if (this.category.discount.name === null) {
            //     this.errorDiscountNameRequired = true;
            //     result = false;
            // } else {
            //     this.errorDiscountNameRequired = false;
            // }
            
            return result
        },

        validateFields() {
            let result = true;
            
            if (this.category.name === null || this.category.name === '') {
                this.errorNameRequired = true;
                result = false;
            } else {
                this.errorNameRequired = false;
            }
            
            return result
        },

        validateChildren(item) {
            let result = true;

            if (item.name === null) {
                this.errorChildrenCategoryNameRequired = true;
                result = false;
            } else {
                this.errorChildrenCategoryNameRequired = false;
            }

            return result;
        },

        validateChildrenCategories() {
            let result = true;
            
            let filtered = this.children.filter(i => i.isActive && i.name !== null);

            if (filtered.length > 0) {
                this.category.children = filtered.map(i => ({
                    name: i.name,
                }));
            }

            return result;
        },

        showNotification(type, text) {
            this.$toasted.show(text, {
                duration: 3000,
                type: type,
                theme: "bubble",
                singleton: true,
                action: {
                    text: 'X',
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    }
                },
            });
        },
    },
    
    watch: {
        'statusSelected': function() {
            this.category.isActive = this.statusSelected;
        }
    },

    computed: {}
}
</script>
<template>
    <div>
        <h3 class="my-3">Ingresá los datos del Producto</h3>

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
                        v-model="product.name">
                    <small v-if="errorNameRequired">Es un campo requerido</small>
                </div>
            </div>

            <div class="row my-2">
                <div class="col-sm-6">
                    <label id="productDescription" class="control-label">Descripción</label>
                    <b-form-textarea
                        id="productDescription"
                        :class="[errorDescriptionRequired ? 'is-invalid' : '']"
                        placeholder="Ingresá la Descripción"
                        v-model="product.description"
                        rows="8">
                    </b-form-textarea>
                    <small v-if="errorDescriptionRequired">Es un campo requerido</small>
                </div>
            </div>

            <div class="row my-2">
                <div class="col-sm-6">
                    <label id="productName" class="control-label">Descripción corta</label>
                    <input 
                        type="text"
                        class="form-control"
                        :class="[errorShortDescriptionRequired ? 'is-invalid' : '']"
                        placeholder="Ingresá la Descripción corta"
                        maxlength="100"
                        v-model="product.shortDescription">
                    <small v-if="errorShortDescriptionRequired">Es un campo requerido</small>
                </div>

                <div class="col-sm-3">
                    <label id="productPrice" class="control-label">Precio</label>
                    <input 
                        type="text"
                        class="form-control"
                        :class="[errorPriceRequired ? 'is-invalid' : '']"
                        placeholder="Ingresá el Precio"
                        v-model="product.price">
                    <small v-if="errorPriceRequired">Es un campo requerido</small>
                </div>

                <div class="col-sm-3">
                    <label id="productEmail" class="control-label">Cantidad</label>
                    <input 
                        type="number"
                        class="form-control"
                        placeholder="Ingresá la Cantidad"
                        v-model="product.quantity">
                </div>
            </div>

            <div class="row my-2">
                <div class="col-sm-4">
                    <label id="productCategory" class="control-label">Categoría</label>
                    <b-form-select v-model="categorySelected" class="form-control">
                        <b-form-select-option :value="null">Please select an option</b-form-select-option>
                        <b-form-select-option value="a">Option A</b-form-select-option>
                        <b-form-select-option value="b" disabled>Option B (disabled)</b-form-select-option>
                        <b-form-select-option-group label="Grouped options">
                            <b-form-select-option :value="{ C: '3PO' }">Option with object value</b-form-select-option>
                            <b-form-select-option :value="{ R: '2D2' }">Another option with object value</b-form-select-option>
                        </b-form-select-option-group>
                    </b-form-select>
                </div>

                <div class="col-sm-3">
                    <label>Estado:</label>
                    <div class="radio-group">
                        <label>
                            <input type="radio" value="1" class="" v-model="statusSelected" /> Activo
                        </label>

                        <label>
                            <input type="radio" value="0" class="margin-left" v-model="statusSelected" /> No Activo
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
                    <h4 class="m-0">Descuentos 
                        <b-icon-plus-circle 
                            class="margin-left pointer"
                            variant="success"
                            v-on:click="handleDiscountSection(true)"
                            v-if="!showDiscount">
                        </b-icon-plus-circle>
                        <b-icon-dash-circle
                            class="margin-left pointer"
                            variant="danger"
                            v-on:click="handleDiscountSection(false)"
                            v-if="showDiscount">
                        </b-icon-dash-circle> 
                    </h4>
                </div>
            </div>

            <div class="row" v-if="showDiscount">
                <div class="col-sm-2">
                    <label id="productEmail" class="control-label">Nombre</label>
                    <input 
                        class="form-control"
                        :class="[errorDiscountNameRequired ? 'is-invalid' : '']"
                        :disabled="discountDisabled"
                        placeholder="Ingresá la Nombre"
                        type="text"
                        v-model="product.discount.name">
                    <small v-if="errorDiscountNameRequired">Es un campo requerido</small>
                </div>

                <div class="col-sm-2">
                    <label id="productEmail" class="control-label">Valor</label>
                    <input 
                        class="form-control"
                        :class="[errorDiscountValueRequired ? 'is-invalid' : '']"
                        type="number"
                        placeholder="Ingresá la Valor"
                        :disabled="discountDisabled"
                        v-model="product.discount.value">
                    <small v-if="errorDiscountValueRequired">Es un campo requerido</small>
                </div>

                <div class="col-sm-4">
                    <b-button 
                        class="mt-4"
                        variant="primary"
                        type="submit"
                        v-on:click="addDiscount()"
                        v-if="!discountDisabled">
                        <b-icon-save class="margin-right"></b-icon-save>
                            Agregar
                    </b-button>
                </div>
            </div>

            <hr>

            <div class="col-sm-12">
                <h4 class="m-0">Atributos personalizados 
                    <b-icon-plus-circle 
                        class="margin-left pointer"
                        variant="success"
                        v-on:click="handleCustomAttributes(true)">
                    </b-icon-plus-circle>
                    <b-icon-dash-circle
                        class="margin-left pointer"
                        :variant="removeCustomAttributeVariant"
                        v-on:click="removeCustomAttribute(false)">
                    </b-icon-dash-circle> 
                </h4>
            </div>

            <div class="row mt-2" v-for="customAttribute in customAttributes" :key="customAttribute.id">
                <div class="col-sm-2" v-if="customAttribute.isActive">
                    <label id="productEmail" class="control-label">Nombre</label>
                    <input 
                        class="form-control"
                        :class="[errorCustomAttributeNameRequired ? 'is-invalid' : '']"
                        :disabled="customAttribute.isDisabled"
                        placeholder="Ingresá la Nombre"
                        type="text"
                        v-model="customAttribute.name">
                    <small v-if="errorCustomAttributeNameRequired">Es un campo requerido</small>
                </div>

                <div class="col-sm-2" v-if="customAttribute.isActive">
                    <label id="productEmail" class="control-label">Valor</label>
                    <input 
                        class="form-control"
                        :class="[errorCustomAttributeValueRequired ? 'is-invalid' : '']"
                        :disabled="customAttribute.isDisabled"
                        placeholder="Ingresá la Valor"
                        type="text"
                        v-model="customAttribute.value">
                    <small v-if="errorCustomAttributeValueRequired">Es un campo requerido</small>
                </div>

                <div class="col-sm-4" v-if="customAttribute.isActive">
                    <b-button 
                        class="mt-4"
                        variant="primary"
                        type="submit"
                        v-on:click="addCustomAttribute(customAttribute)"
                        v-if="!customAttribute.isDisabled">
                        <b-icon-save class="margin-right"></b-icon-save>
                            Agregar
                    </b-button>
                </div>
            </div>

            <div class="pull-right">
                <b-button variant="primary" type="submit" v-on:click="postAddProduct()">Guardar</b-button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex"
import "@/assets/style.css"

export default {
    data() {
        return {
            errorNameRequired: false,
            errorDescriptionRequired: false,
            errorShortDescriptionRequired: false,
            errorPriceRequired: false,
            errorDiscountNameRequired: false,
            errorDiscountValueRequired: false,
            errorCustomAttributeNameRequired: false,
            errorCustomAttributeValueRequired: false,

            product: {
                name: "Producto de prueba",
                description: "Esta es la Descripcion larga de un producto de pruba",
                shortDescription: "Y esta la corta",
                price: 150,
                quantity: 0,
                category: 1,
                status: 2,
                image: null,
                discount: {
                    name: "Descuento del 10%",
                    value: 10
                },
                customAttributes: [
                    {
                        name: "Atributo personalizado 1",
                        value: "XL"
                    }
                ],
            },

            // product: {
            //     name: null,
            //     description: null,
            //     shortDescription: null,
            //     price: 0,
            //     quantity: 0,
            //     category: null,
            //     status: null,
            //     image: null,
            //     discount: {
            //         name: null,
            //         value: 0
            //     },
            //     customAttributes: [],
            // },

            file: null,

            customAttributes: [
                {
                    id: 0,
                    name: null,
                    value: null,
                    isActive: false,
                    isDisabled: false,
                },
                {
                    id: 1,
                    name: null,
                    value: null,
                    isActive: false,
                    isDisabled: false,
                },
                {
                    id: 2,
                    name: null,
                    value: null,
                    isActive: false,
                    isDisabled: false,
                },
                {
                    id: 3,
                    name: null,
                    value: null,
                    isActive: false,
                    isDisabled: false,
                },
                {
                    id: 4,
                    name: null,
                    value: null,
                    isActive: false,
                    isDisabled: false,
                }
            ],

            categorySelected: null,
            statusSelected: 1,
            showImage: false,
            showDiscount: false,
            discountDisabled: false,
            showCustomAttributes: false,
            removeCustomAttributeVariant: "outline-dark",
        }
    },

    created() { 
    },

    methods: {
        cleanFile() {
            this.$refs['file-input'].reset();
        },

        cleanProduct() {
            this.product = {
                product: {
                    name: null,
                    description: null,
                    shortDescription: null,
                    price: 0,
                    quantity: 0,
                    category: null,
                    status: null,
                    image: null,
                    discount: {
                        name: null,
                        value: 0
                    },
                    customAttributes: [],
                }
            }
        },

        handleImagenSection(show) {
            this.showImage = show;

            if (!show) {
                this.cleanFile();
            }
        },

        handleDiscountSection(show) {
            this.showDiscount = show;

            if (!show) {
                this.cleanDiscount();
            }
        },

        cleanDiscount() {
            this.discountDisabled = this.errorDiscountNameRequired = this.errorDiscountValueRequired = false;
            this.product.discount.name = null;
            this.product.discount.value = 0;
        },

        cleanCustomAttributes() {
            this.customAttributes = this.customAttributes.map(i => ({
                ...i,
                name: null,
                value: 0
            }));
        },

        handleCustomAttributes(show) {
            let item = this.customAttributes.find(ca => !ca.isActive);
            
            if (item !== undefined) {
                this.removeCustomAttributeVariant = "danger";
                item.isActive = show;
            } else {
                this.showNotification("error", "Solo es posible asociar 5 Atributos personalizados ");
            }
        },

        removeCustomAttribute(status) {
            let item = this.customAttributes.find(ca => ca.isActive);

            if (item !== undefined) {
                if (item.isActive) {
                    item.isActive = status;
                    item.isDisabled = status;
                    this.checkCustomAttributes();
                }
            }
        },

        checkCustomAttributes() {
            let result = this.customAttributes.find(ca => ca.isActive);

            if (result === undefined) {
                this.cleanCustomAttributes();
                this.removeCustomAttributeVariant = "outline-dark";
            } else {
                this.removeCustomAttributeVariant = "danger";
            }
        },

        addDiscount() {
            let isValid = this.validateDiscount();

            if (isValid) {
                this.discountDisabled = true;
            }
        },

        addCustomAttribute(item) {
            let isValid = this.validateCustomAttribute(item);
            
            if (isValid) {
                this.product.customAttributes.push(item);
                item.isDisabled = true;
            }
        },

        async postAddProduct() {
            // let config = {
            //     headers: {
            //         Authorization: this.token
            //     }
            // }

            //this.axios.post("/cadets", this.cadet, config)
            let discountValidation = true;
            let customAttributesValidation = true;
            // let customAttributesValidation = this.customAttributes.filter(i => i.isActive);

            // if (this.showDiscount) {
            //     console.log("se valida discountValidation");
            //     discountValidation = this.validateDiscount();
            // }

            // if (customAttributesValidation.length > 0) {
            //     console.log("se valida customAttributesValidation");
            //     customAttributesValidation = this.validateCustomAttributes();
            // } else {
            //     this.product.customAttributes = [];
            // }

            if (discountValidation && customAttributesValidation) {
                let validateForm = this.validateFields();
                
                if (validateForm) {
                    this.product.discount = JSON.stringify(this.product.discount);
                    this.product.customAttributes = JSON.stringify(this.product.customAttributes);

                    let body = {
                        product: this.product
                    }

                    await this.axios.post("/products", body)
                    .then(res => {
                        this.cleanProduct();
                        
                        this.showNotification("success", "Se ingresó correctamente el Producto");
                    })
                    .catch(e => {                    
                        // if (e.response.data.error.errors.name.message) {
                        //     this.message.text = e.response.data.error.errors.name.message;
                        // } else {
                        //     this.message.text = "No se ingresó la Nota"
                        // }
                    })
                }
            }
        },

        validateFields() {
            let result = true;
            
            if (this.product.name === null) {
                this.errorNameRequired = true;
                result = false;
            } else {
                this.errorNameRequired = false;
            }

            if (this.product.description === null) {
                this.errorDescriptionRequired = true;
                result = false;
            } else {
                this.errorDescriptionRequired = false;
            }
            
            if (this.product.shortDescription === null) {
                this.errorShortDescriptionRequired = true;
                result = false;
            } else {
                this.errorShortDescriptionRequired = false;
            }

            if (this.product.price <= 0) {
                this.errorPriceRequired = true;
                result = false;
            } else {
                this.errorPriceRequired = false;
            }
            
            return result
        },

        validateDiscount() {
            let result = true;
            
            if (this.product.discount.name === null) {
                this.errorDiscountNameRequired = true;
                result = false;
            } else {
                this.errorDiscountNameRequired = false;
            }

            if (this.product.discount.value <= 0) {
                this.errorDiscountValueRequired = true;
                result = false;
            } else {
                this.errorDiscountValueRequired = false;
            }
            
            return result
        },

        validateCustomAttribute(item) {
            let result = true;

            if (item.name === null) {
                this.errorCustomAttributeNameRequired = true;
                result = false;
            } else {
                this.errorCustomAttributeNameRequired = false;
            }

            if (item.value === null) {
                this.errorCustomAttributeValueRequired = true;
                result = false;
            } else {
                this.errorCustomAttributeValueRequired = false;
            }

            return result;
        },

        validateCustomAttributes() {
            let result = true;
            
            let filtered = this.customAttributes.filter(i => i.isActive && i.name !== null);

            if (filtered.length > 0) {
                this.product.customAttributes = filtered.map(i => ({
                    name: i.name,
                    value: i.value
                }));
            }

            console.log(this.product.customAttributes);

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
        'product.price': function() {
            // Eliminar caracteres que no sean números ni puntos decimales
            this.product.price = this.product.price.replace(/[^0-9.]/g, '');

            // Eliminar ceros a la izquierda
            this.product.price = this.product.price.replace(/^0+/, '');

            // Limitar a dos cifras decimales
            const portions = this.product.price.split('.');

            if (portions.length === 2) {
                portions[1] = portions[1].slice(0, 2);
                this.product.price = portions.join('.');
            } else if (portions.length > 2) {
                this.product.price = portions[0] + '.' + portions[1].slice(0, 2);
            }
        },

        'product.quantity': function() {
            // Eliminar ceros a la izquierda
            this.product.quantity = this.product.quantity.replace(/[^0-9.]/g, "").replace(/^0+/, "");

            // Si hay más de un punto decimal, eliminar el exceso
            const parts = this.product.quantity.split(".");
            if (parts.length > 2) {
                this.product.quantity = parts[0] + "." + parts.slice(1).join("");
            }
        },

        'product.discount.value': function() {
            // Eliminar caracteres que no sean números ni puntos decimales
            this.product.discount.value = this.product.discount.value.replace(/[^0-9.]/g, '');

            // Eliminar ceros a la izquierda
            this.product.discount.value = this.product.discount.value.replace(/^0+/, '');

            // Limitar a dos cifras decimales
            const portions = this.product.discount.value.split('.');

            if (portions.length === 2) {
                portions[1] = portions[1].slice(0, 2);
                this.product.discount.value = portions.join('.');
            } else if (portions.length > 2) {
                this.product.discount.value = portions[0] + '.' + portions[1].slice(0, 2);
            }
        }
    },

    computed: {
        ...mapState([""]),
    }
}
</script>
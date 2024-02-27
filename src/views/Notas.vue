<template>
    <div class="container">
        <b-alert
            :show="dismissCountdown"
            dismissible
            :variant="message.color"
            @dismissed="dismissCountdown=0"
            @dismiss-count-down="countdownChanged">
            {{ message.text }}
        </b-alert>
        
        <h3 class="my-3"> Notas </h3>

        <form v-on:submit.prevent="addNote()" v-if="!isEditing">
            <input type="text" class="form-control my-2" placeholder="Ingresá el nombre" v-model="note.name">
            <input type="text" class="form-control my-2" placeholder="Ingresá la descripción" v-model="note.description">
            
            <b-button class="btn-success my-2" type="submit">Add</b-button>
        </form>

        <form v-on:submit.prevent="editNote(selectedNote)" v-if="isEditing">
            <input type="text" class="form-control my-2" placeholder="Ingresá el nombre" v-model="selectedNote.name">
            <input type="text" class="form-control my-2" placeholder="Ingresá la descripción" v-model="selectedNote.description">

            <b-button class="btn-warning my-2 mx-2" type="submit">Edit</b-button>
            <b-button class="my-2 btn-dark" type="submit" v-on:click="isEditing = false">Cancel</b-button>
        </form>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(note, index) in  notes" :key="index">
                    <th scope="row">{{ note._id }}</th>
                    <td>{{ note.name }}</td>
                    <td>{{ note.description }}</td>
                    <td>
                        <b-button v-on:click="deleteNote(note._id)" class="btn-sm btn-danger mx-2">Delete</b-button>
                        <b-button v-on:click="changeForm(note._id)" class="btn-sm btn-warning">Edit</b-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from "vuex"

export default {
    data() {
        return {
            notes: [],
            dismissSecs: 5,
            dismissCountdown: 0,
            message: { text: "", color: "" },
            note: { name: "", description: "", },
            selectedNote: {},
            isEditing: false,
        }
    },

    created() {
        this.getNotes();
    },

    methods: {
        alert() {
            this.message.color = "success";
            this.message.text = "Éxito";
            this.showAlert();
        },

        countdownChanged(dismissCountdown) {
            this.dismissCountdown = dismissCountdown;
        },

        showAlert() {
            this.dismissCountdown = this.dismissSecs;
        },

        getNotes() {
            let config = {
                headers: {
                    Authorization: this.token
                }
            }

            this.axios.get("/nota", config)
            .then(res => {
                this.notes = res.data;
            })
            .catch(e => {
                console.log(e.response);
            })
        },

        addNote() {
            let config = {
                headers: {
                    Authorization: this.token
                }
            }

            this.axios.post("/new-note", this.note, config)
            .then(res => {
                this.notes.push(res.data)
                
                this.note.name = "";
                this.note.description = "";

                this.message.color = "success";
                this.message.text = "Nota agregada correctamente";
                this.showAlert();
            })
            .catch(e =>{
                this.message.color = "danger";

                if (e.response.data.error.errors.name.message) {
                    this.message.text = e.response.data.error.errors.name.message;
                } else {
                    this.message.text = "No se ingresó la Nota"
                }
                
                this.showAlert();
                console.log(e.response)
            })
        },

        deleteNote(id) {
            this.axios.delete(`/nota/${id}`, id)
            .then(res => {
                const index = this.notes.findIndex(note => note._id === res.data._id);
                this.notes.splice(index, 1);

                this.message.color = "success";
                this.message.text = "Nota eliminada correctamente";
                this.showAlert();
            })
            .catch(e => {

            })
        },

        editNote(selectedNote) {
            this.axios.put(`/nota/${selectedNote._id}`, selectedNote)
            .then(res => {
                const index = this.notes.findIndex(note => note._id === res.data._id);
                this.notes[index].name = res.data.name;
                this.notes[index].description = res.data.description;

                this.message.color = "success";
                this.message.text = "Nota actualizada correctamente";
                this.showAlert();
                this.isEditing = false;
            })
            .catch(e => {
                console.log(e.response)
            })
        },

        changeForm(id) {
            this.isEditing = true;

            this.axios.get(`/nota/${id}`)
            .then(res => {
                this.selectedNote = res.data;
            })
            .catch(e => {
                console.log(e.response);
            })
        }
    },

    computed: {
        ...mapState(["token"])
    }

}
</script>
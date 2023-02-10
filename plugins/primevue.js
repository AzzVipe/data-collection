import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import Steps from "primevue/steps";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(PrimeVue, { ripple: true });
	nuxtApp.vueApp.component("Button", Button);
	nuxtApp.vueApp.component("Card", Card);
	nuxtApp.vueApp.component("InputText", InputText);
	nuxtApp.vueApp.component("Dialog", Dialog);
	nuxtApp.vueApp.component("DataTable", DataTable);
	nuxtApp.vueApp.component("Column", Column);
	nuxtApp.vueApp.component("Dropdown", Dropdown);
	nuxtApp.vueApp.component("Steps", Steps);
});

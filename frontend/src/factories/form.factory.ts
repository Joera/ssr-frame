import { showLink } from "./frame.factory";
import { preview } from "./preview.factory";

export const parseFormData = (formData: FormData) => {

    let object: any  = {};
    formData.forEach((value, key) => {
        // Reflect.has in favor of: object.hasOwnProperty(key)
        if(!Reflect.has(object, key)){
            object[key] = value;
            return;
        }
        if(!Array.isArray(object[key])){
            object[key] = [object[key]];    
        }
        object[key].push(value);
    });

    return object;
}

export const submit = (e: FormDataEvent, id: string) => {

    const formData = parseFormData(e.formData);
    const DOMAIN = "https://renderer.autonomous-times.com" // localhost:3009

        const eas = JSON.parse(formData.raw_eas);
        console.log(eas);

        fetch(DOMAIN + '/create', { 
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: formData.raw_eas
        })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (result) {
            console.log(result);

            const eas = JSON.parse(formData.raw_eas)

            preview(result.image);
            showLink("runV1", eas.sig.uid)
        })
        .catch (function (error) {
            console.log('Request failed', error);
        });

}


export const armForm = async () => {

    return new Promise( (resolve,reject) => {

        const el = document.querySelector('form') as HTMLFormElement;

        let self = this;

        const onSubmit = (e: Event) => {
            e.preventDefault();
            new FormData(el);
        }
    
        el.addEventListener("submit", onSubmit );
        el.addEventListener("formdata", async (cc: any) => {
            resolve(submit(cc,el.id));
        });
    });
}
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

    console.log(JSON.parse(formData.raw_eas));

        fetch('http://localhost:3009/create', { 
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

            preview(result.image);
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
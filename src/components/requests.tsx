import { SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export function Entrance(nav: NavigateFunction) {    
    let loader = document.querySelector('.block_loader');
    loader?.classList.remove('block_loader_none');

    const applicantForm = document.getElementById('login');
    let logopass = applicantForm?.querySelectorAll('input');
    let  datalogin: Record<string, string> = {};
    logopass?.forEach((e)=> {
        let key = e.name;
        let value = e.value;
        datalogin[key] = value;
    })

    async function queriLogin(datalogin: Record<string, string>) {
        await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
            method: 'POST',
            body: JSON.stringify(datalogin),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data?.accessToken) {
                localStorage.setItem('graduation_project', data?.accessToken);
                nav('/')
                window.location.reload()
            } else {
                
                alert(data?.message)
                window.location.reload()
            }
        })
    }
    queriLogin(datalogin)
}
export async function HandlerGetAccountInfo (authorized: string | undefined, setDataInfo: { (value: SetStateAction<{}>): void; (arg0: any): void; }) {
    if (!authorized) {
        return
    }
    
    let token = `Bearer ${localStorage.graduation_project}`
    await fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (typeof(data) == 'object') {
            setDataInfo(data);
        }
    })
}
export async function HandlerSearchQuery() {
    
}
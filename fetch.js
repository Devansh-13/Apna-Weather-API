
export async function callAPI(url,opt){
    const pr=await fetch(url,opt);
    const data=await pr.json();
    return data;
}


import { ajax, AjaxRequest } from "rxjs/ajax";

export interface GraphQlBody {
    variables?: string;
    operationName?: string|null;
    query: string;
}
export interface AgentOption {
    method?: string;
    url?: string;
    csrf: string;
    service?: string;
    credential?: boolean|null|undefined 
    graphqlBody?: GraphQlBody;
    headers?:any;
    body?: any;
}

const cainedOption: any = (aO: AgentOption)=>{
    
    let finalOption: any = {
        url: '',
        method: 'GET',
        withCredentials : true,
        headers: {
            'CSRF-Token': `:(`,
        }
    }

    aO.method ? finalOption.method = aO.method : null
    aO.url ? finalOption.url = aO.url : null
    aO.credential ? finalOption.withCredentials = aO.credential : null
    aO.headers && aO.headers.authorization ? finalOption.headers['Authorization'] = aO.headers.authorization : null
    aO.csrf ? finalOption.headers['CSRF-Token'] = aO.csrf : null

    
    switch(aO.service){
        case 'graphql':
            const {graphqlBody} = aO
            finalOption.method = 'POST'
            finalOption.url = '/graphql'
            finalOption.headers['content-type'] = 'application/json'
            finalOption.headers['Accept'] = 'application/json'
            const initBody = {variables: {},operationName: null,query: ''}
            graphqlBody ?finalOption.body = {...initBody, ...graphqlBody}:finalOption.body = initBody
        break;
    }

    
    return finalOption
}

const client = (customOption: AgentOption)=>{
    return ajax(cainedOption(customOption))
}
export default client

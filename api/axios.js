import Axios from 'axios'
import { baseUrl } from '../shared/baseUrl';


export default {
    dishes: {
        fecthAll: () => Axios.get(baseUrl + "dishes")
            .then(res => res.data),
        create: item => Axios.post(baseUrl + "dishes", { item }).then(res => res.data),
    },
    comments: {
        fecthAll: () => Axios.get(baseUrl + "comments")
            .then(res => res.data),
        create: item => Axios.post(baseUrl + "comments", { item }).then(res => res.data),
    },
    promotions: {
        fecthAll: () => Axios.get(baseUrl + "promotions")
            .then(res => res.data),
        create: item => Axios.post(baseUrl + "promotions", { item }).then(res => res.data),
    },
    leaders: {
        fecthAll: () => Axios.get(baseUrl + "leaders")
            .then(res => res.data),
        create: item => Axios.post(baseUrl + "leaders", { item }).then(res => res.data),
    },
    feedback: {
        fecthAll: () => Axios.get(baseUrl + "feedback")
            .then(res => res.data),
        create: item => Axios.post(baseUrl + "feedback", { item }).then(res => res.data),
    },
}
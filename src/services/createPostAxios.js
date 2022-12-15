import InitServerAxios from "./initServerAxios";

class CreatePostAxios extends InitServerAxios {
    constructor() {
        super('/create-post')
    }

    createPost(body) {
        return this.axios.post('', body).then((response) => response.data)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new CreatePostAxios()
        }
        return this.instance
    }

}

export default CreatePostAxios.getInstance();
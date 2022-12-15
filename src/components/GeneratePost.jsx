import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import parse from "html-react-parser";
import CreatePostAxios from '../services/createPostAxios';
import { useForm } from 'react-hook-form';

const { Configuration, OpenAIApi } = require("openai");

const GeneratePost = () => {
    const [finalText1, setFinalText1] = useState()
    const [finalText2, setFinalText2] = useState()
    const [finalText3, setFinalText3] = useState()
    const [showText, setShowText] = useState(false)
    const [configIA, setConfigIA] = useState({})

    const [configApi, setConfigApi] = useState({})
    const [title, setConfigtitle] = useState('')
    const [content, setConfigContent] = useState('')
    const [configPost, setConfigPost] = useState('')
    const [configUrl, setConfigUrl] = useState('')
    const [configUserName, setConfigUserName] = useState('')
    const [configStatus, setConfigStatus] = useState({})
    const [configPassword, setConfigPassword] = useState({})

    const { register, handleSubmit } = useForm()

    const configuration = new Configuration({
        apiKey: configApi,
    })

    const openai = new OpenAIApi(configuration);


    const updateNewPromt = (eventHTML) => {
        const { name, value } = eventHTML.target
        setConfigIA({ ...configIA, [name]: value })


    };

    const createApi = ({ apikey }) => {
        setConfigApi(apikey)
        console.log(apikey)
    }

    // const createApi = (eventHTML) => {
    //     eventHTML.preventDefault()
    //     const { apiKey } = configIA
    //     setConfigApi(apiKey)
    //     console.log(typeof apiKey);
    // }

    // const createNewPromt1 = (eventHTML) => {
    //     eventHTML.preventDefault()
    //     const { blogTopic } = configIA
    //     console.log(blogTopic);
    //     generateBlogTopics(blogTopic)
    // }

    const createNewPromt1 = ({ blogTopic }) => {
        console.log(blogTopic);
        generateBlogTopics(blogTopic)
    }

    const generateBlogTopics = async (blogTopic) => {
        setShowText(true)

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Generate list in html format about: ${blogTopic}`,
            temperature: 0.7,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
        setFinalText1(parse(completion.data.choices[0].text))
        setShowText(false)
    }
    // console.log(finalText1 && finalText1[1].props.children.map(li => li.props?.children !== undefined && li.props?.children));

    // const createNewPromt2 = (eventHTML) => {
    //     eventHTML.preventDefault()
    //     const { blogSection } = configIA
    //     generateBlogSections(blogSection)

    // }

    const createNewPromt2 = ({ blogSection }) => {
        console.log(blogSection)
        generateBlogSections(blogSection)

    }

    const generateBlogSections = async (blogSection) => {
        setShowText(true)

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Generate paragraph in html format about: ${blogSection}`,
            temperature: 0.6,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
        setFinalText2(parse(completion.data.choices[0].text))
        console.log(parse(completion.data.choices[0].text));
        setShowText(false)
    }

    // const createNewPromt3 = (eventHTML) => {
    //     eventHTML.preventDefault()
    //     const { blogExpander } = configIA
    //     blogSectionExpander(blogExpander)

    // }

    const createNewPromt3 = ({ blogExpander }) => {
        console.log(blogExpander)
        blogSectionExpander(blogExpander)
    }

    const blogSectionExpander = async (blogExpander) => {
        setShowText(true)

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Generate text of 500 words with h1 and three h2 with three paragraphs in html format about: ${blogExpander}`,
            temperature: 0.7,
            max_tokens: 3500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
        setFinalText3(parse(completion.data.choices[0].text))
        setShowText(false)

        const title = parse(completion.data.choices[0].text.split('\n\n', 2)[1]).props.children
        setConfigtitle(title)
        console.log('title', title);

        const content = completion.data.choices[0].text.replace(/\n/g, ' ').split('</h1>')[1];
        setConfigContent(content)
        console.log('CONTENIDO ', content);
    }


    const publicWordPress = ({ url, username, category, status, password }) => {
        // const { url, username, password } = configIA
        setConfigUrl(url)
        setConfigUserName(username)
        setConfigPassword(password)
        setConfigStatus(status)

        const prueba = {
            title: title,
            content: content,
            url: url,
            username: username,
            category: category,
            status: status,
            password: password
        }

        setConfigPost(prueba)

        // console.log(configPost)
        // console.log(url);
        // console.log(username);
        // console.log(password);
        // console.log(status);
        // console.log(title);
        // console.log(content);
        // console.log(prueba);


        console.log('DATA', prueba)

        CreatePostAxios
            .createPost(prueba)
            .then((response) => console.log(response))



    }

    return (
        <>
            <div className="container text-white">
                <h1 className="my-5 text-center">Herramienta de escritura de blogs online</h1>

                <div className="d-flex justify-content-center">
                    <p className="my-5 col-6 text-left">La herramienta de escritura de blogs le permitirá introducir un tema de blog, palabras clave y obtener Post completo que puede utilizar en cualquier lugar. La herramienta proporciona inicialmente una lista de ideas de temas para elegir, una vez que seleccione un tema, puede seguir adelante y generar un Post de contenido completo AI.</p>
                </div>

                <div className="row d-flex justify-content-center mb-5">
                    <div className="col-lg-6 d-flex justify-content-start">
                        <Form className="" onSubmit={handleSubmit(createApi)}>
                            <Form.Group className="mb-3">
                                <div className="form-groupd">
                                    <label className="form-label">Introduce tu APIKEY de OpenIA</label>
                                    <div className=''>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="apiKey"
                                            {...register('apikey')}
                                            placeholder="Introduce un tema para el blog"
                                        />
                                        <p className='my-2'>{configApi.length > 1 && configApi}</p>
                                    </div>
                                </div>
                            </Form.Group>

                            <Button type="submit" id="SubmitApiKey" className="btn btn-primary d-flex justify-content-center">Aceptar</Button>
                        </Form>
                    </div>

                </div>

                <div className="row d-flex justify-content-center mb-5">
                    <div className="col-lg-6 d-flex justify-content-start">
                        <Form className="" onSubmit={handleSubmit(createNewPromt1)}>
                            <Form.Group className="mb-3">
                                <div className="form-groupd">
                                    <label className="form-label">¿Sobre qué tema quieres obtener ideas para tu blog?</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="blogTopic"
                                        {...register('blogTopic')}
                                        placeholder="Introduce un tema para el blog"
                                    />
                                </div>
                            </Form.Group>

                            <Button type="submit" id="blogTopicButton" className="btn btn-primary d-flex justify-content-center">Generar ideas para el blog</Button>
                        </Form>
                    </div>

                    {finalText1 &&
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-lg-6">
                                {finalText1 && finalText1}
                            </div>
                        </div>
                    }
                    {showText && < h3 className='text-center mb-5'>davinci-003 Generando texto...</h3>}
                </div>






                <div className="row d-flex justify-content-center mb-5">
                    <div className="col-lg-6 d-flex justify-content-start">
                        <Form className="" onSubmit={handleSubmit(createNewPromt2)}>
                            <Form.Group className="mb-3">
                                <div className="form-group">
                                    <label className="form-label">Introduzca el tema del blog que ha seleccionado para escribir</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="blogSection"
                                        {...register('blogSection')}
                                        placeholder="Introduce el título del blog para generar secciones del mismo"
                                    />
                                </div>
                            </Form.Group>

                            <Button type="submit" className="btn btn-primary d-flex justify-content-center">Generar secciones de blog</Button>
                        </Form>
                    </div>


                    {finalText2 &&
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-lg-6">
                                {finalText2 && finalText2}
                            </div>
                        </div>
                    }
                    {showText && < h3 className='text-center mb-5'>davinci-003 Generando texto...</h3>}
                </div>


                <div className="row d-flex justify-content-center">
                    <div className="col-lg-6 d-flex justify-content-start">
                        <Form className="" onSubmit={handleSubmit(createNewPromt3)}>
                            <Form.Group className="mb-3">
                                <div className="form-group">
                                    <label className="form-label">Introduzca el título de la sección del blog que desea ampliar</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="blogExpander"
                                        {...register('blogExpander')}
                                        placeholder="Introduce el título de la sección del blog"
                                    />
                                </div>
                            </Form.Group>

                            <Button type="submit" className="btn btn-primary d-flex justify-content-start">Ampliar el título</Button>
                        </Form>
                    </div>


                    {finalText3 &&
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-lg-6">
                                {finalText3 && finalText3}
                            </div>
                        </div>
                    }
                    {showText && < h3 className='text-center mb-5'>davinci-003 Generando texto...</h3>}
                </div>

                {finalText3 &&
                    <div className="row d-flex justify-content-center mb-5">
                        <div className="col-lg-6 d-flex justify-content-start">
                            <Form className="" onSubmit={handleSubmit(publicWordPress)}>

                                <Form.Group className="mb-3">
                                    <div className="form-groupd">
                                        <label className="form-label">Introduce La URL de dominio</label>
                                        <div className=''>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="url"
                                                {...register('url')}
                                                placeholder="Ejemplo: https://tudominio.com"
                                            />
                                            <p className='my-2'>{configUrl.length > 1 && configUrl}</p>
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <div className="form-groupd">
                                        <label className="form-label">Introduce el nombre de usuario en WordPress</label>
                                        <div className=''>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                {...register('username')}
                                                placeholder="Nombre de usuario"
                                            />
                                            <p className='my-2'>{configUserName.length > 1 && configUserName}</p>
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <div className="form-groupd">
                                        <label className="form-label">Introduce la categoría del post</label>
                                        <div className=''>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="category"
                                                {...register('category')}
                                                placeholder="Solo una categoría"
                                            />
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <div className="form-groupd">
                                        <label className="form-label">Introduce el estado de post</label>
                                        <div className=''>
                                            <Form.Select {...register('status')} id="status">
                                                <option value="draft">Borrador</option>
                                                <option value="publish">Público</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <div className="form-groupd">
                                        <label className="form-label">Introduce la contraseña de usuario en WordPress</label>
                                        <div className=''>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                {...register('password')}
                                                placeholder="password"
                                            />
                                        </div>
                                    </div>
                                </Form.Group>

                                <Button type="submit" id="publicWordpress" className="btn btn-primary d-flex justify-content-center">Aceptar</Button>
                            </Form>
                        </div>

                    </div>}
            </div>
        </>
    )
}

export default GeneratePost
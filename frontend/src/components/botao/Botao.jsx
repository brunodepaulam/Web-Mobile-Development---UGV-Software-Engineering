import './Botao.css'

function Botao(props) {
    return (
        <button className='botao'>{props.titulo}</button>
    )
}

export default Botao;
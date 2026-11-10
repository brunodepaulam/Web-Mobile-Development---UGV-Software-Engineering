import { useState, useEffect } from "react";
import Botao from "../../components/botao/Botao";
import "./Home.css";
import API_URL from "../../services/api";

function Home() {
    const [pessoas, setPessoas] = useState([]);
    const [nome, setNome] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    // READ (Listar)
    const buscarPessoas = async () => {
        try {
            const response = await fetch(`${API_URL}/pessoas`);
            const data = await response.json();
            setPessoas(data);
        } catch (error) {
            console.error("Erro ao buscar pessoas:", error);
        }
    };

    useEffect(() => {
        buscarPessoas();
    }, []);

    // CREATE e UPDATE (Salvar)
    const salvarPessoa = async (e) => {
        e.preventDefault();
        if (!nome) return alert("Digite um nome!");

        try {
            if (editandoId) {
                // Update
                await fetch(`${API_URL}/pessoas/${editandoId}`, { // <-- Corrigido para /pessoas
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pes_nome: nome }),
                });
                setEditandoId(null);
            } else {
                // Create
                await fetch(`${API_URL}/pessoas`, { // <-- Corrigido para /pessoas
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pes_nome: nome }),
                });
            }
            setNome("");
            buscarPessoas(); // Atualiza a lista na tela
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };

    // DELETE (Excluir)
    const excluirPessoa = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir?")) return;
        try {
            await fetch(`${API_URL}/pessoas/${id}`, { // <-- Corrigido para /pessoas
                method: "DELETE",
            });
            buscarPessoas();
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    };

    // Preparar para editar
    const prepararEdicao = (pessoa) => {
        setNome(pessoa.nome);
        setEditandoId(pessoa.id);
    };

    const cancelarEdicao = () => {
        setNome("");
        setEditandoId(null);
    };

    return (
        <main style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            minHeight: "100vh", 
            textAlign: "center",
            width: "50%",
            margin: "0 auto",
            padding: "20px",
            borderRadius: "10px"
            }}>
                
            <h2>Cadastro de Pessoas</h2>
            
            {/* Formulário CREATE / UPDATE */}
            <form onSubmit={salvarPessoa} style={{ marginBottom: "20px" }}>
                <input 
                    type="text" 
                    placeholder="Digite o nome..." 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={{ padding: "8px", marginRight: "10px" }}
                />
                <button type="submit" style={{ padding: "8px 16px" }}>
                    {editandoId ? "Atualizar" : "Cadastrar"}
                </button>
                {editandoId && (
                    <button type="button" onClick={cancelarEdicao} style={{ marginLeft: "10px" }}>
                        Cancelar
                    </button>
                )}
            </form>

            {/* READ (Listagem) */}
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {pessoas.map((pessoa) => (
                    <li key={pessoa.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>
                        <strong>{pessoa.nome}</strong> (ID: {pessoa.id})
                        <div style={{ marginTop: "5px" }}>
                            <button onClick={() => prepararEdicao(pessoa)} style={{ marginRight: "10px" }}>
                                Editar
                            </button>
                            <button onClick={() => excluirPessoa(pessoa.id)}>
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <Botao titulo="Botão da Aula" />
        </main>
    );
}

export default Home;
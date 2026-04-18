import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [equipamentos, setEquipamentos] = useState([]);
  const [locais, setLocais] = useState([]);
  const [demandas, setDemandas] = useState([]);
  const [logado, setLogado] = useState(!!localStorage.getItem("token"));

  const [nomeLocal, setNomeLocal] = useState("");
  const [tipoLocal, setTipoLocal] = useState("");
  const [enderecoLocal, setEnderecoLocal] = useState("");

  const [nomeEquipamento, setNomeEquipamento] = useState("");
  const [tipoEquipamento, setTipoEquipamento] = useState("");
  const [statusEquipamento, setStatusEquipamento] = useState("");
  const [localEquipamento, setLocalEquipamento] = useState("");

  const [tituloDemanda, setTituloDemanda] = useState("");
  const [descricaoDemanda, setDescricaoDemanda] = useState("");
  const [localDemanda, setLocalDemanda] = useState("");
  const [equipamentoDemanda, setEquipamentoDemanda] = useState("");
  const [statusDemanda, setStatusDemanda] = useState("");
  const [editandoDemandaId, setEditandoDemandaId] = useState(null);

  useEffect(() => {
    if (logado) {
      listarLocais();
      listarEquipamentos();
      listarDemandas();
    }
  }, [logado]);

  async function login(e) {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", {
        email,
        senha,
      });

      localStorage.setItem("token", res.data.token);
      setLogado(true);
      setMensagem("Login realizado com sucesso!");
    } catch (err) {
      setMensagem("Erro no login");
    }
  }

  async function registrar(e) {
    e.preventDefault();

    try {
      await api.post("/users/register", {
        nome,
        email,
        senha,
      });

      setMensagem("Usuário cadastrado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
    } catch (err) {
      setMensagem("Erro ao cadastrar usuário");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setLogado(false);
    setEquipamentos([]);
    setLocais([]);
    setDemandas([]);
    setMensagem("Logout realizado com sucesso!");
  }

  async function listarEquipamentos() {
    try {
      const res = await api.get("/equipamentos");
      setEquipamentos(res.data);
    } catch (err) {
      setMensagem("Erro ao buscar equipamentos");
    }
  }

  async function listarLocais() {
    try {
      const res = await api.get("/locais");
      setLocais(res.data);
    } catch (err) {
      setMensagem("Erro ao buscar locais");
    }
  }

  async function listarDemandas() {
    try {
      const res = await api.get("/demandas");
      setDemandas(res.data);
    } catch (err) {
      setMensagem("Erro ao buscar demandas");
    }
  }

  async function cadastrarLocal(e) {
    e.preventDefault();

    try {
      await api.post("/locais", {
        nome: nomeLocal,
        tipo: tipoLocal,
        endereco: enderecoLocal,
      });

      setMensagem("Local cadastrado com sucesso!");
      setNomeLocal("");
      setTipoLocal("");
      setEnderecoLocal("");
      listarLocais();
    } catch (err) {
      setMensagem("Erro ao cadastrar local");
    }
  }

  async function cadastrarEquipamento(e) {
    e.preventDefault();

    try {
      await api.post("/equipamentos", {
        nome: nomeEquipamento,
        tipo: tipoEquipamento,
        status: statusEquipamento,
        local: localEquipamento || null,
      });

      setMensagem("Equipamento cadastrado com sucesso!");
      setNomeEquipamento("");
      setTipoEquipamento("");
      setStatusEquipamento("");
      setLocalEquipamento("");
      listarEquipamentos();
    } catch (err) {
      setMensagem("Erro ao cadastrar equipamento");
    }
  }

  async function cadastrarDemanda(e) {
    e.preventDefault();

    try {
      await api.post("/demandas", {
        titulo: tituloDemanda,
        descricao: descricaoDemanda,
        local: localDemanda,
        equipamento: equipamentoDemanda || null,
        status: statusDemanda,
      });

      setMensagem("Demanda cadastrada com sucesso!");
      setTituloDemanda("");
      setDescricaoDemanda("");
      setLocalDemanda("");
      setEquipamentoDemanda("");
      setStatusDemanda("");
      listarDemandas();
    } catch (err) {
      setMensagem("Erro ao cadastrar demanda");
    }
  }
  function limparFormularioDemanda() {
  setTituloDemanda("");
  setDescricaoDemanda("");
  setLocalDemanda("");
  setEquipamentoDemanda("");
  setStatusDemanda("");
  setEditandoDemandaId(null);
}

function editarDemanda(demanda) {
  setTituloDemanda(demanda.titulo || "");
  setDescricaoDemanda(demanda.descricao || "");
  setLocalDemanda(demanda.local?._id || demanda.local || "");
  setEquipamentoDemanda(demanda.equipamento?._id || demanda.equipamento || "");
  setStatusDemanda(demanda.status || "");
  setEditandoDemandaId(demanda._id);
  setMensagem("Editando demanda selecionada.");
}

async function excluirDemanda(id) {
  const confirmar = window.confirm("Tem certeza que deseja excluir esta demanda?");

  if (!confirmar) return;

  try {
    await api.delete(`/demandas/${id}`);
    setMensagem("Demanda excluída com sucesso!");

    if (editandoDemandaId === id) {
      limparFormularioDemanda();
    }

    listarDemandas();
  } catch (err) {
    setMensagem("Erro ao excluir demanda");
  }
}

async function atualizarDemanda(e) {
  e.preventDefault();

  try {
    await api.put(`/demandas/${editandoDemandaId}`, {
      titulo: tituloDemanda,
      descricao: descricaoDemanda,
      local: localDemanda,
      equipamento: equipamentoDemanda || null,
      status: statusDemanda,
    });

    setMensagem("Demanda atualizada com sucesso!");
    limparFormularioDemanda();
    listarDemandas();
  } catch (err) {
    setMensagem("Erro ao atualizar demanda");
  }
}

  return (
    <div className="page">
      <header className="hero">
        <div className="hero__badge">Sistema Web</div>
        <h1>Gestão de Equipamentos</h1>
        <p>
          
        </p>
      </header>

      {mensagem && <div className="alert">{mensagem}</div>}

      {!logado ? (
        <section className="auth-grid">
          <div className="card">
            <div className="card__header">
              <h2>Entrar</h2>
              <p>Acesse sua conta para utilizar o sistema.</p>
            </div>

            <form onSubmit={login} className="form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Entrar
              </button>
            </form>
          </div>

          <div className="card">
            <div className="card__header">
              <h2>Criar conta</h2>
              <p>Cadastre um novo usuário para acessar o sistema.</p>
            </div>

            <form onSubmit={registrar} className="form">
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Crie uma senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-secondary btn-full">
                Cadastrar
              </button>
            </form>
          </div>
        </section>
      ) : (
        <main className="dashboard">
          <section className="card">
            <div className="card__header">
              <h2>Painel do sistema</h2>
              <p>Gerencie equipamentos, locais e demandas.</p>
            </div>

            <div className="actions">
              <button onClick={listarEquipamentos} className="btn btn-primary">
                Listar Equipamentos
              </button>

              <button onClick={listarLocais} className="btn btn-secondary">
                Listar Locais
              </button>

              <button onClick={listarDemandas} className="btn btn-secondary">
                Listar Demandas
              </button>

              <button onClick={logout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </section>

          <section className="content-grid">
            <section className="card">
              <div className="card__header">
                <h2>Cadastrar Local</h2>
                <p>Adicione um novo local ao sistema.</p>
              </div>

              <form onSubmit={cadastrarLocal} className="form">
                <div className="form-group">
                  <label>Nome do local</label>
                  <input
                    type="text"
                    placeholder="Ex.: UBS Centro"
                    value={nomeLocal}
                    onChange={(e) => setNomeLocal(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Tipo</label>
                  <input
                    type="text"
                    placeholder="Ex.: UBS, CAPS, CEO"
                    value={tipoLocal}
                    onChange={(e) => setTipoLocal(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Endereço</label>
                  <input
                    type="text"
                    placeholder="Digite o endereço"
                    value={enderecoLocal}
                    onChange={(e) => setEnderecoLocal(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  Cadastrar Local
                </button>
              </form>
            </section>

            <section className="card">
              <div className="card__header">
                <h2>Cadastrar Equipamento</h2>
                <p>Adicione um novo equipamento ao sistema.</p>
              </div>

              <form onSubmit={cadastrarEquipamento} className="form">
                <div className="form-group">
                  <label>Nome do equipamento</label>
                  <input
                    type="text"
                    placeholder="Ex.: Computador Dell"
                    value={nomeEquipamento}
                    onChange={(e) => setNomeEquipamento(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Tipo</label>
                  <input
                    type="text"
                    placeholder="Ex.: Desktop, Notebook, Impressora"
                    value={tipoEquipamento}
                    onChange={(e) => setTipoEquipamento(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <input
                    type="text"
                    placeholder="Ex.: Em uso, Em manutenção"
                    value={statusEquipamento}
                    onChange={(e) => setStatusEquipamento(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Local</label>
                  <select
                    value={localEquipamento}
                    onChange={(e) => setLocalEquipamento(e.target.value)}
                  >
                    <option value="">Selecione um local</option>
                    {locais.map((local) => (
                      <option key={local._id} value={local._id}>
                        {local.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  Cadastrar Equipamento
                </button>
              </form>
            </section>

            <section className="card">
              <div className="card__header">
                <h2>{editandoDemandaId ? "Editar Demanda" : "Cadastrar Demanda"}</h2>
                <p>{editandoDemandaId
    ? "Altere os dados da demanda selecionada."
    : "Registre uma nova demanda de TI."}</p>
              </div>

              <form onSubmit={editandoDemandaId ? atualizarDemanda : cadastrarDemanda}
  className="form">
                <div className="form-group">
                  <label>Título</label>
                  <input
                    type="text"
                    placeholder="Ex.: PC não liga"
                    value={tituloDemanda}
                    onChange={(e) => setTituloDemanda(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Descrição</label>
                  <input
                    type="text"
                    placeholder="Descreva o problema"
                    value={descricaoDemanda}
                    onChange={(e) => setDescricaoDemanda(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Local</label>
                  <select
                    value={localDemanda}
                    onChange={(e) => setLocalDemanda(e.target.value)}
                  >
                    <option value="">Selecione um local</option>
                    {locais.map((local) => (
                      <option key={local._id} value={local._id}>
                        {local.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Equipamento</label>
                  <select
                    value={equipamentoDemanda}
                    onChange={(e) => setEquipamentoDemanda(e.target.value)}
                  >
                    <option value="">Selecione um equipamento</option>
                    {equipamentos.map((equipamento) => (
                      <option key={equipamento._id} value={equipamento._id}>
                        {equipamento.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <input
                    type="text"
                    placeholder="Ex.: Aberta, Em andamento, Resolvida"
                    value={statusDemanda}
                    onChange={(e) => setStatusDemanda(e.target.value)}
                  />
                </div>

                <div className="actions">
  <button type="submit" className="btn btn-primary">
    {editandoDemandaId ? "Salvar Alterações" : "Cadastrar Demanda"}
  </button>

  {editandoDemandaId && (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={limparFormularioDemanda}
    >
      Cancelar Edição
    </button>
  )}
</div>
              </form>
            </section>
          </section>

          <section className="content-grid">
            <div className="card">
              <div className="card__header">
                <h2>Equipamentos</h2>
                <p>
                  {equipamentos.length > 0
                    ? `${equipamentos.length} equipamento(s) carregado(s).`
                    : "Nenhum equipamento carregado ainda."}
                </p>
              </div>

              {equipamentos.length > 0 ? (
                <ul className="data-list">
                  {equipamentos.map((eq) => (
                    <li key={eq._id} className="data-item">
                      <div>
                        <strong>{eq.nome}</strong>
                        <span>Tipo: {eq.tipo || "Não informado"}</span>
                        <span>Status: {eq.status || "Não informado"}</span>
                        <span>
                          Local: {eq.local?.nome || "Não informado"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="empty-state">
                  Clique em <strong>Listar Equipamentos</strong>.
                </div>
              )}
            </div>

            <div className="card">
              <div className="card__header">
                <h2>Locais</h2>
                <p>
                  {locais.length > 0
                    ? `${locais.length} local(is) carregado(s).`
                    : "Nenhum local carregado ainda."}
                </p>
              </div>

              {locais.length > 0 ? (
                <ul className="data-list">
                  {locais.map((local) => (
                    <li key={local._id} className="data-item">
                      <div>
                        <strong>{local.nome}</strong>
                        <span>Tipo: {local.tipo || "Não informado"}</span>
                        <span>Endereço: {local.endereco || "Não informado"}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="empty-state">
                  Clique em <strong>Listar Locais</strong>.
                </div>
              )}
            </div>

            <div className="card">
              <div className="card__header">
                <h2>Demandas</h2>
                <p>
                  {demandas.length > 0
                    ? `${demandas.length} demanda(s) carregada(s).`
                    : "Nenhuma demanda carregada ainda."}
                </p>
              </div>

              {demandas.length > 0 ? (
                <ul className="data-list">
                  {demandas.map((demanda) => (
  <li key={demanda._id} className="data-item">
    <div>
      <strong>{demanda.titulo}</strong>
      <span>
        Descrição: {demanda.descricao || "Não informada"}
      </span>
      <span>Status: {demanda.status || "Não informado"}</span>
      <span>
        Local: {demanda.local?.nome || "Não informado"}
      </span>
      <span>
        Equipamento: {demanda.equipamento?.nome || "Não informado"}
      </span>

      <div className="item-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => editarDemanda(demanda)}
        >
          Editar
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => excluirDemanda(demanda._id)}
        >
          Excluir
        </button>
      </div>
    </div>
  </li>
))}
                </ul>
              ) : (
                <div className="empty-state">
                  Clique em <strong>Listar Demandas</strong>.
                </div>
              )}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
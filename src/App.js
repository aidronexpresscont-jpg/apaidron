import React, { useState, useEffect } from "react";
import {
  Package,
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  User,
  ShoppingBag,
  Bell,
  Menu,
  X,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  TrendingUp,
  AlertCircle,
  Heart,
  ShoppingCart,
  Star,
  Filter,
  ChevronRight,
  Home,
  List,
  CreditCard,
  Settings,
} from "lucide-react";

const AidronExpressApp = () => {
  const [userType, setUserType] = useState("cliente");
  const [currentView, setCurrentView] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [cartItems, setCartItems] = useState([]);
  const [favoritos, setFavoritos] = useState(["P001", "P002"]);
  const [cartOpen, setCartOpen] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [selectedService, setSelectedService] = useState(null);

  // Produtos - Camisetas Aidron Express (6 modelos com imagens reais)
  const [produtos, setProdutos] = useState([
    {
      id: "P001",
      nome: "Camiseta Aidron Express Branca - Logo Peito",
      descricao:
        "Camiseta oficial 100% algodão, logo pequeno no peito, design elegante",
      preco: 45000,
      precoFormatado: "45.000 Db",
      estoque: 50,
      categoria: "Camisetas",
      imagem:
        "/mnt/user-data/uploads/Red_and_Gray_Minimalist_Premium_Fashion_T-Shirt_Instagram_Post__1_.png",
      cores: ["Branco"],
      tamanhos: ["S", "M", "L", "XL"],
      avaliacao: 4.9,
      vendidos: 145,
    },
    {
      id: "P002",
      nome: "Camiseta Aidron Express Branca - Logo Central",
      descricao:
        "Design premium com logo grande centralizado, perfeita para o dia a dia",
      preco: 50000,
      precoFormatado: "50.000 Db",
      estoque: 35,
      categoria: "Camisetas Premium",
      imagem:
        "/mnt/user-data/uploads/Red_and_Gray_Minimalist_Premium_Fashion_T-Shirt_Instagram_Post.png",
      cores: ["Branco"],
      tamanhos: ["M", "L", "XL"],
      avaliacao: 5.0,
      vendidos: 98,
    },
    {
      id: "P003",
      nome: "Camiseta Aidron Express Branca - Logo Grande",
      descricao: "Destaque com logo grande e moderno, ideal para fãs da marca",
      preco: 48000,
      precoFormatado: "48.000 Db",
      estoque: 42,
      categoria: "Camisetas Premium",
      imagem:
        "/mnt/user-data/uploads/Red_and_Gray_Minimalist_Premium_Fashion_T-Shirt_Instagram_Post__2_.png",
      cores: ["Branco"],
      tamanhos: ["S", "M", "L", "XL", "XXL"],
      avaliacao: 4.8,
      vendidos: 123,
    },
    {
      id: "P004",
      nome: "Camiseta Aidron Express Preta - Logo Destaque",
      descricao:
        "Elegância em preto com logo azul em destaque, estilo profissional",
      preco: 45000,
      precoFormatado: "45.000 Db",
      estoque: 60,
      categoria: "Camisetas",
      imagem:
        "/mnt/user-data/uploads/Black_and_White_Minimalist_T-Shirt_Mockup_Instagram_Post__1_.png",
      cores: ["Preto"],
      tamanhos: ["S", "M", "L", "XL", "XXL"],
      avaliacao: 4.9,
      vendidos: 178,
    },
    {
      id: "P005",
      nome: "Camiseta Aidron Express Preta - Logo Central",
      descricao: "Design arrojado com logo central grande, máximo conforto",
      preco: 50000,
      precoFormatado: "50.000 Db",
      estoque: 38,
      categoria: "Camisetas Premium",
      imagem:
        "/mnt/user-data/uploads/Black_and_White_Minimalist_T-Shirt_Mockup_Instagram_Post.png",
      cores: ["Preto"],
      tamanhos: ["M", "L", "XL"],
      avaliacao: 5.0,
      vendidos: 156,
    },
    {
      id: "P006",
      nome: "Camiseta Aidron Express Preta - Logo Peito",
      descricao:
        "Estilo discreto e elegante, logo pequeno no peito, perfeita para trabalho",
      preco: 48000,
      precoFormatado: "48.000 Db",
      estoque: 45,
      categoria: "Camisetas Premium",
      imagem:
        "/mnt/user-data/uploads/Black_and_White_Minimalist_T-Shirt_Mockup_Instagram_Post__2_.png",
      cores: ["Preto"],
      tamanhos: ["S", "M", "L", "XL", "XXL"],
      avaliacao: 4.8,
      vendidos: 134,
    },
  ]);

  // Serviços completos da tabela
  const [servicos, setServicos] = useState([
    {
      id: "S001",
      nome: "Entrega Expressa Urbana",
      preco: 60,
      precoFormatado: "60 STN",
      descricao: "Entrega rápida dentro da cidade em 1–2 horas",
      categoria: "Express",
      destaque: true,
      tempo: "1-2h",
    },
    {
      id: "S002",
      nome: "Entrega Programada",
      preco: 45,
      precoFormatado: "45 STN",
      descricao: "Cliente escolhe o horário de recolha e entrega",
      categoria: "Standard",
      tempo: "Agendado",
    },
    {
      id: "S003",
      nome: "Entrega Inter-Distrital",
      preco: 120,
      precoFormatado: "120+ STN",
      descricao: "Envio entre distritos",
      categoria: "Longa distância",
      tempo: "1-2 dias",
    },
    {
      id: "S004",
      nome: "Entrega Porta-a-Porta",
      preco: 75,
      precoFormatado: "75 STN",
      descricao: "Recolha e entrega direta no destino",
      categoria: "Standard",
      tempo: "3-5h",
    },
    {
      id: "S005",
      nome: "Transporte de Encomendas Médias",
      preco: 100,
      precoFormatado: "100 STN",
      descricao: "Caixas e produtos até 10 kg",
      categoria: "Carga",
      peso: "Até 10kg",
    },
    {
      id: "S006",
      nome: "Serviço Empresarial Regular",
      preco: 450,
      precoFormatado: "450+ STN/mês",
      descricao: "Entregas frequentes para empresas",
      categoria: "Empresarial",
      destaque: true,
      periodicidade: "Mensal",
    },
    {
      id: "S007",
      nome: "Serviço de Compras e Entrega",
      preco: 55,
      precoFormatado: "55 STN + compra",
      descricao: "Mensageiro compra e entrega",
      categoria: "Especial",
      tempo: "2-4h",
    },
    {
      id: "S008",
      nome: "Transporte p/ Restaurantes & Lojas",
      preco: 85,
      precoFormatado: "85+ STN",
      descricao: "Distribuição de produtos comerciais",
      categoria: "Comercial",
      tempo: "1-3h",
    },
    {
      id: "S009",
      nome: "Entrega Noturna",
      preco: 90,
      precoFormatado: "90 STN",
      descricao: "Entregas entre 18h e 23h",
      categoria: "Especial",
      horario: "18h-23h",
    },
    {
      id: "S010",
      nome: "Entrega Premium Prioritária",
      preco: 110,
      precoFormatado: "110 STN",
      descricao: "Entrega imediata sem paragens",
      categoria: "Premium",
      destaque: true,
      tempo: "30min-1h",
    },
    {
      id: "S011",
      nome: "Entrega de Documentos Sensíveis",
      preco: 70,
      precoFormatado: "70 STN",
      descricao: "Transporte seguro de documentos",
      categoria: "Seguro",
      tempo: "2-3h",
    },
    {
      id: "S012",
      nome: "Transporte de Encomendas Grandes",
      preco: 150,
      precoFormatado: "150 STN",
      descricao: "Volumes entre 10–25 kg",
      categoria: "Carga",
      peso: "10-25kg",
    },
    {
      id: "S013",
      nome: "Serviço de Retorno",
      preco: 95,
      precoFormatado: "95 STN",
      descricao: "Levar um item e trazer outro",
      categoria: "Especial",
      tempo: "3-6h",
    },
    {
      id: "S014",
      nome: "Entrega para Eventos",
      preco: 100,
      precoFormatado: "100 STN",
      descricao: "Materiais para eventos",
      categoria: "Eventos",
      tempo: "Agendado",
    },
    {
      id: "S015",
      nome: "Assinatura e Confirmação",
      preco: 65,
      precoFormatado: "65 STN",
      descricao: "Entrega com comprovativo",
      categoria: "Seguro",
      tempo: "2-4h",
    },
    {
      id: "S016",
      nome: "Entrega Agendada Empresas",
      preco: 55,
      precoFormatado: "55 STN",
      descricao: "Entregas fixas programadas",
      categoria: "Empresarial",
      periodicidade: "Recorrente",
    },
    {
      id: "S017",
      nome: "Distribuição (Várias Paragens)",
      preco: 120,
      precoFormatado: "120+ STN",
      descricao: "Rota com múltiplos destinos",
      categoria: "Múltiplo",
      tempo: "4-8h",
    },
    {
      id: "S018",
      nome: "Entrega no Mesmo Dia",
      preco: 50,
      precoFormatado: "50 STN",
      descricao: "Entrega standard no mesmo dia",
      categoria: "Standard",
      tempo: "4-8h",
    },
    {
      id: "S019",
      nome: "Moto-Entrega Rápida",
      preco: 60,
      precoFormatado: "60 STN",
      descricao: "Entrega rápida de pequenos itens",
      categoria: "Express",
      tempo: "30min-2h",
    },
    {
      id: "S020",
      nome: "Carrinha p/ Itens Grandes",
      preco: 180,
      precoFormatado: "180+ STN",
      descricao: "Transporte de grandes volumes",
      categoria: "Carga",
      peso: "25kg+",
    },
    {
      id: "S021",
      nome: "Entrega de Medicamentos por Drones",
      preco: 140,
      precoFormatado: "140 STN",
      descricao: "Entrega rápida e segura por drone",
      categoria: "Tecnologia",
      destaque: true,
      tempo: "15-30min",
    },
  ]);

  // Dados de entregas
  const [entregas, setEntregas] = useState([
    {
      id: "AE001",
      cliente: "Maria Silva",
      telefone: "+239 999 1234",
      origem: "Av. 12 de Julho, São Tomé",
      destino: "Bairro Bela Vista, Trindade",
      status: "em_transito",
      entregador: "João Santos",
      valor: "60 STN",
      data: "29/01/2026",
      horario: "14:30",
      peso: "2kg",
      tipo: "Entrega Expressa Urbana",
    },
    {
      id: "AE002",
      cliente: "António Costa",
      telefone: "+239 998 5678",
      origem: "Mercado Municipal",
      destino: "Pantufo",
      status: "pendente",
      entregador: "Não atribuído",
      valor: "120 STN",
      data: "29/01/2026",
      horario: "15:00",
      peso: "8kg",
      tipo: "Entrega Inter-Distrital",
    },
    {
      id: "AE003",
      cliente: "Rosa Nascimento",
      telefone: "+239 997 9012",
      origem: "Porto de São Tomé",
      destino: "Guadalupe",
      status: "entregue",
      entregador: "Carlos Mendes",
      valor: "75 STN",
      data: "28/01/2026",
      horario: "11:00",
      peso: "5kg",
      tipo: "Entrega Porta-a-Porta",
    },
  ]);

  // Histórico de compras do cliente
  const [historicoCompras, setHistoricoCompras] = useState([
    {
      id: "C001",
      data: "25/01/2026",
      total: 90000,
      totalFormatado: "90.000 Db",
      status: "entregue",
      items: [
        {
          produto: "Camiseta Aidron Express Branca",
          quantidade: 2,
          preco: 45000,
        },
      ],
    },
    {
      id: "C002",
      data: "20/01/2026",
      total: 95000,
      totalFormatado: "95.000 Db",
      status: "entregue",
      items: [
        {
          produto: "Camiseta Aidron Express Preta",
          quantidade: 1,
          preco: 45000,
        },
        {
          produto: "Camiseta Aidron Express Branca Logo Grande",
          quantidade: 1,
          preco: 50000,
        },
      ],
    },
  ]);

  const [entregadores, setEntregadores] = useState([
    {
      id: "E001",
      nome: "João Santos",
      telefone: "+239 991 2345",
      veiculo: "Moto Honda",
      placa: "ST-1234",
      entregas_hoje: 8,
      status: "ativo",
      avaliacao: 4.8,
    },
    {
      id: "E002",
      nome: "Carlos Mendes",
      telefone: "+239 992 3456",
      veiculo: "Carrinha Toyota",
      placa: "ST-5678",
      entregas_hoje: 5,
      status: "ativo",
      avaliacao: 4.9,
    },
  ]);

  // Funções auxiliares
  const getStatusColor = (status) => {
    const colors = {
      pendente: "bg-yellow-50 text-yellow-700 border-yellow-200",
      em_transito: "bg-blue-50 text-blue-700 border-blue-200",
      entregue: "bg-green-50 text-green-700 border-green-200",
      cancelado: "bg-red-50 text-red-700 border-red-200",
    };
    return colors[status] || colors.pendente;
  };

  const getStatusText = (status) => {
    const texts = {
      pendente: "Pendente",
      em_transito: "Em Trânsito",
      entregue: "Entregue",
      cancelado: "Cancelado",
    };
    return texts[status] || "Pendente";
  };

  const addToCart = (produto) => {
    const exists = cartItems.find((item) => item.id === produto.id);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...produto, quantidade: 1 }]);
    }
    setNotifications(notifications + 1);
  };

  const removeFromCart = (produtoId) => {
    setCartItems(cartItems.filter((item) => item.id !== produtoId));
  };

  const updateCartQuantity = (produtoId, quantidade) => {
    if (quantidade <= 0) {
      removeFromCart(produtoId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === produtoId ? { ...item, quantidade } : item
        )
      );
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  const toggleFavorito = (produtoId) => {
    if (favoritos.includes(produtoId)) {
      setFavoritos(favoritos.filter((id) => id !== produtoId));
    } else {
      setFavoritos([...favoritos, produtoId]);
    }
  };

  const openModal = (type, data = null) => {
    setModalType(type);
    setSelectedOrder(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedOrder(null);
    setSelectedService(null);
  };

  const produtosFiltrados = produtos.filter(
    (p) =>
      (categoriaFiltro === "Todos" || p.categoria === categoriaFiltro) &&
      p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Componente Header
  const Header = () => (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Aidron Express</h1>
              <p className="text-blue-100 text-sm">
                Entregas Rápidas e Seguras
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <Bell className="w-6 h-6 cursor-pointer hover:text-blue-200 transition-colors" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </div>

            {userType === "cliente" && (
              <div className="relative">
                <ShoppingCart
                  className="w-6 h-6 cursor-pointer hover:text-blue-200 transition-colors"
                  onClick={() => setCartOpen(!cartOpen)}
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <User className="w-5 h-5" />
              <span className="font-semibold">
                {userType === "admin"
                  ? "Admin"
                  : userType === "entregador"
                  ? "Entregador"
                  : "Cliente"}
              </span>
            </div>

            <select
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                setCurrentView(
                  e.target.value === "admin"
                    ? "dashboard"
                    : e.target.value === "entregador"
                    ? "minhas-entregas"
                    : "inicio"
                );
              }}
              className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
            >
              <option value="cliente" className="text-gray-900">
                Cliente
              </option>
              <option value="entregador" className="text-gray-900">
                Entregador
              </option>
              <option value="admin" className="text-gray-900">
                Admin
              </option>
            </select>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );

  // Componente Sidebar
  const Sidebar = () => {
    const menuItems =
      userType === "admin"
        ? [
            { icon: TrendingUp, label: "Dashboard", view: "dashboard" },
            { icon: List, label: "Entregas", view: "entregas" },
            { icon: ShoppingBag, label: "Produtos", view: "produtos" },
            { icon: User, label: "Entregadores", view: "entregadores" },
            { icon: Settings, label: "Configurações", view: "config" },
          ]
        : userType === "entregador"
        ? [
            { icon: Truck, label: "Minhas Entregas", view: "minhas-entregas" },
            { icon: TrendingUp, label: "Dashboard", view: "dashboard" },
            { icon: User, label: "Perfil", view: "perfil" },
          ]
        : [
            { icon: Home, label: "Início", view: "inicio" },
            { icon: Truck, label: "Serviços", view: "servicos" },
            { icon: ShoppingBag, label: "Loja", view: "loja" },
            { icon: Heart, label: "Favoritos", view: "favoritos" },
            { icon: MapPin, label: "Rastrear", view: "rastrear" },
            { icon: List, label: "Histórico", view: "historico-compras" },
          ];

    return (
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block w-64 bg-white shadow-lg min-h-screen`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentView(item.view);
                setMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.view
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    );
  };

  // Carrinho Lateral
  const CarrinhoLateral = () => (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            <h2 className="text-xl font-bold">Carrinho</h2>
          </div>
          <button onClick={() => setCartOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Carrinho vazio</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.nome}</h3>
                    <p className="text-blue-600 font-bold">
                      {item.precoFormatado}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantidade - 1)
                        }
                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantidade}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantidade + 1)
                        }
                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-blue-600">
                {getCartTotal().toLocaleString()} Db
              </span>
            </div>
            <button
              onClick={() => {
                openModal("finalizar-compra");
                setCartOpen(false);
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // View: Serviços de Entrega
  const ServicosEntrega = () => {
    const categorias = ["Todos", ...new Set(servicos.map((s) => s.categoria))];

    return (
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Nossos Serviços
          </h2>
          <p className="text-gray-600">
            Escolha o serviço ideal para suas necessidades
          </p>
        </div>

        <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaFiltro(cat)}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
                categoriaFiltro === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos
            .filter(
              (s) =>
                categoriaFiltro === "Todos" || s.categoria === categoriaFiltro
            )
            .map((servico) => (
              <div
                key={servico.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-2 ${
                  servico.destaque ? "border-yellow-400" : "border-transparent"
                }`}
                onClick={() => openModal("solicitar-servico", servico)}
              >
                <div className="p-6">
                  {servico.destaque && (
                    <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                      DESTAQUE
                    </div>
                  )}

                  <div className="text-5xl mb-4">{servico.icone}</div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {servico.nome}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {servico.descricao}
                  </p>

                  <div className="space-y-2 mb-4">
                    {servico.tempo && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} className="text-blue-600" />
                        <span>{servico.tempo}</span>
                      </div>
                    )}
                    {servico.peso && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Package size={16} className="text-blue-600" />
                        <span>{servico.peso}</span>
                      </div>
                    )}
                    {servico.horario && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} className="text-blue-600" />
                        <span>{servico.horario}</span>
                      </div>
                    )}
                    {servico.periodicidade && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} className="text-blue-600" />
                        <span>{servico.periodicidade}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">
                      {servico.precoFormatado}
                    </div>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Solicitar
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  // View: Loja de Produtos
  const LojaCliente = () => {
    const categorias = ["Todos", ...new Set(produtos.map((p) => p.categoria))];

    return (
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Loja Aidron Express
          </h2>
          <p className="text-gray-600">Produtos oficiais da marca</p>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  categoriaFiltro === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <button
                  onClick={() => toggleFavorito(produto.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
                >
                  <Heart
                    size={20}
                    className={
                      favoritos.includes(produto.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>
                {produto.estoque < 20 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Estoque Baixo
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {produto.nome}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {produto.descricao}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(produto.avaliacao)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({produto.vendidos} vendidos)
                  </span>
                </div>

                {produto.tamanhos && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-600 mb-1">
                      Tamanhos disponíveis:
                    </div>
                    <div className="flex gap-2">
                      {produto.tamanhos.map((tam) => (
                        <span
                          key={tam}
                          className="border border-gray-300 px-2 py-1 rounded text-xs"
                        >
                          {tam}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {produto.precoFormatado}
                    </div>
                    <div className="text-xs text-gray-500">
                      {produto.estoque} em estoque
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(produto)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {produtosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    );
  };

  // View: Início Cliente
  const InicioCliente = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Bem-vindo à Aidron Express!
        </h2>
        <p className="text-gray-600 text-lg">
          juntos entregamos, o que não pode espera
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg">
          <Truck className="w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold mb-2">21 Serviços</h3>
          <p className="text-blue-100">Diversas opções de entrega</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg">
          <Clock className="w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold mb-2">30min - 1h</h3>
          <p className="text-green-100">Entrega expressa disponível</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg">
          <Package className="w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold mb-2">100% Seguro</h3>
          <p className="text-purple-100">Suas encomendas protegidas</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Serviços em Destaque
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicos
            .filter((s) => s.destaque)
            .map((servico) => (
              <div
                key={servico.id}
                className="border-2 border-yellow-400 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => {
                  setCurrentView("servicos");
                  setCategoriaFiltro(servico.categoria);
                }}
              >
                <div className="text-4xl mb-3">{servico.icone}</div>
                <h4 className="font-bold text-lg mb-2">{servico.nome}</h4>
                <p className="text-gray-600 text-sm mb-3">
                  {servico.descricao}
                </p>
                <div className="text-2xl font-bold text-blue-600">
                  {servico.precoFormatado}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <Truck className="text-blue-600" />
            Solicitar Entrega
          </h3>
          <p className="text-gray-600 mb-6">
            Envie suas encomendas com rapidez e segurança
          </p>
          <button
            onClick={() => setCurrentView("servicos")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Ver Serviços
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <ShoppingBag className="text-green-600" />
            Loja de Produtos
          </h3>
          <p className="text-gray-600 mb-6">
            Camisetas oficiais e produtos Aidron Express
          </p>
          <button
            onClick={() => setCurrentView("loja")}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Visitar Loja
          </button>
        </div>
      </div>
    </div>
  );

  // View: Favoritos
  const FavoritosView = () => {
    const produtosFavoritos = produtos.filter((p) => favoritos.includes(p.id));

    return (
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Heart className="text-red-500 fill-red-500" />
            Meus Favoritos
          </h2>
          <p className="text-gray-600">
            {produtosFavoritos.length} produtos salvos
          </p>
        </div>

        {produtosFavoritos.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              Nenhum favorito ainda
            </h3>
            <p className="text-gray-500 mb-6">
              Adicione produtos aos favoritos para vê-los aqui
            </p>
            <button
              onClick={() => setCurrentView("loja")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Explorar Loja
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtosFavoritos.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <button
                    onClick={() => toggleFavorito(produto.id)}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
                  >
                    <Heart size={20} className="fill-red-500 text-red-500" />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {produto.nome}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {produto.descricao}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(produto.avaliacao)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({produto.vendidos} vendidos)
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">
                      {produto.precoFormatado}
                    </div>
                    <button
                      onClick={() => addToCart(produto)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // View: Rastreamento
  const RastreamentoView = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Rastrear Pedido
        </h2>
        <p className="text-gray-600">
          Digite o código da sua entrega para rastrear
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Digite o código (ex: AE001)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2">
            <Search size={20} />
            Rastrear
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Minhas Entregas Ativas
        </h3>
        <div className="space-y-4">
          {entregas
            .filter((e) => e.status !== "entregue")
            .map((entrega) => (
              <div
                key={entrega.id}
                className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {entrega.id}
                    </div>
                    <div className="text-sm text-gray-600">{entrega.tipo}</div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      entrega.status
                    )}`}
                  >
                    {getStatusText(entrega.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">De:</div>
                    <div className="font-semibold">{entrega.origem}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Para:</div>
                    <div className="font-semibold">{entrega.destino}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <Clock className="inline w-4 h-4 mr-1" />
                    {entrega.data} às {entrega.horario}
                  </div>
                  <button
                    onClick={() => openModal("detalhes", entrega)}
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                  >
                    Ver Detalhes
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // View: Histórico de Compras
  const HistoricoComprasView = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Histórico de Compras
        </h2>
        <p className="text-gray-600">
          {historicoCompras.length} compras realizadas
        </p>
      </div>

      <div className="space-y-6">
        {historicoCompras.map((compra) => (
          <div key={compra.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xl font-bold text-gray-800 mb-1">
                  Pedido {compra.id}
                </div>
                <div className="text-sm text-gray-600">{compra.data}</div>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                  compra.status
                )}`}
              >
                {getStatusText(compra.status)}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-3 mb-4">
                {compra.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{item.produto}</div>
                      <div className="text-sm text-gray-600">
                        Quantidade: {item.quantidade}
                      </div>
                    </div>
                    <div className="font-bold text-blue-600">
                      {item.preco.toLocaleString()} Db
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold text-green-600">
                  {compra.totalFormatado}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // View: Dashboard Admin
  const DashboardAdmin = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard Administrativo
        </h2>
        <p className="text-gray-600">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg">
          <Package className="w-10 h-10 mb-4" />
          <h3 className="text-3xl font-bold mb-2">{entregas.length}</h3>
          <p className="text-blue-100">Total de Entregas</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg">
          <CheckCircle className="w-10 h-10 mb-4" />
          <h3 className="text-3xl font-bold mb-2">
            {entregas.filter((e) => e.status === "entregue").length}
          </h3>
          <p className="text-green-100">Entregues</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white p-6 rounded-xl shadow-lg">
          <Clock className="w-10 h-10 mb-4" />
          <h3 className="text-3xl font-bold mb-2">
            {entregas.filter((e) => e.status === "pendente").length}
          </h3>
          <p className="text-yellow-100">Pendentes</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg">
          <Truck className="w-10 h-10 mb-4" />
          <h3 className="text-3xl font-bold mb-2">
            {entregas.filter((e) => e.status === "em_transito").length}
          </h3>
          <p className="text-purple-100">Em Trânsito</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Entregas Recentes
        </h3>
        <div className="space-y-4">
          {entregas.slice(0, 5).map((entrega) => (
            <div
              key={entrega.id}
              className="flex items-center justify-between border-b border-gray-200 pb-4"
            >
              <div>
                <div className="font-bold text-lg">{entrega.id}</div>
                <div className="text-sm text-gray-600">
                  {entrega.cliente} • {entrega.destino}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    entrega.status
                  )}`}
                >
                  {getStatusText(entrega.status)}
                </span>
                <button
                  onClick={() => openModal("detalhes", entrega)}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // View: Entregas (Admin)
  const EntregasView = () => (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Gerenciar Entregas
          </h2>
          <p className="text-gray-600">{entregas.length} entregas no sistema</p>
        </div>
        <button
          onClick={() => openModal("nova-entrega")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
        >
          <Plus size={20} />
          Nova Entrega
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Destino
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Entregador
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {entregas.map((entrega) => (
                <tr key={entrega.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-blue-600">
                    {entrega.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold">{entrega.cliente}</div>
                    <div className="text-sm text-gray-600">
                      {entrega.telefone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{entrega.destino}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        entrega.status
                      )}`}
                    >
                      {getStatusText(entrega.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{entrega.entregador}</td>
                  <td className="px-6 py-4 font-bold text-green-600">
                    {entrega.valor}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("detalhes", entrega)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit size={18} />
                      </button>
                      {entrega.status === "pendente" && (
                        <button
                          onClick={() =>
                            openModal("atribuir-entregador", entrega)
                          }
                          className="text-green-600 hover:text-green-700"
                        >
                          <User size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // View: Produtos (Admin)
  const ProdutosView = () => (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Gerenciar Produtos
          </h2>
          <p className="text-gray-600">
            {produtos.length} produtos cadastrados
          </p>
        </div>
        <button
          onClick={() => openModal("novo-produto")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
        >
          <Plus size={20} />
          Novo Produto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
          >
            <div className="relative">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              {produto.estoque < 20 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Estoque Baixo
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                {produto.nome}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{produto.descricao}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Preço:</span>
                  <span className="font-bold text-blue-600">
                    {produto.precoFormatado}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estoque:</span>
                  <span className="font-semibold">
                    {produto.estoque} unidades
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vendidos:</span>
                  <span className="font-semibold">{produto.vendidos}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Edit size={16} />
                  Editar
                </button>
                <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Modal Component
  const Modal = () => {
    if (!showModal) return null;

    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={closeModal}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
            <h2 className="text-2xl font-bold text-gray-800">
              {modalType === "nova-entrega" && "Nova Entrega"}
              {modalType === "solicitar-servico" && "Solicitar Serviço"}
              {modalType === "finalizar-compra" && "Finalizar Compra"}
              {modalType === "detalhes" && "Detalhes da Entrega"}
              {modalType === "atribuir-entregador" && "Atribuir Entregador"}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            {modalType === "solicitar-servico" && selectedOrder && (
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  closeModal();
                  alert("Serviço solicitado com sucesso!");
                }}
              >
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                  <div className="text-4xl mb-3">{selectedOrder.icone}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedOrder.nome}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedOrder.descricao}
                  </p>
                  <div className="text-3xl font-bold text-blue-600">
                    {selectedOrder.precoFormatado}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Endereço de Recolha
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="De onde vamos recolher?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Endereço de Entrega
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Para onde vamos entregar?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Telefone de Contato
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+239 999 9999"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Data e Hora
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="time"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Observações
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Informações adicionais..."
                  ></textarea>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Confirmar Pedido
                  </button>
                </div>
              </form>
            )}

            {modalType === "nova-entrega" && (
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  closeModal();
                  alert("Entrega criada com sucesso!");
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Nome do Cliente
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+239 999 9999"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Tipo de Serviço
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione um serviço</option>
                    {servicos.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nome} - {s.precoFormatado}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Endereço de Origem
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="De onde vamos recolher?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Endereço de Destino
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Para onde vamos entregar?"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Data
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Horário
                    </label>
                    <input
                      type="time"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Observações
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Informações adicionais..."
                  ></textarea>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Criar Entrega
                  </button>
                </div>
              </form>
            )}

            {modalType === "finalizar-compra" && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-3">Resumo do Pedido</h3>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.nome} x{item.quantidade}
                        </span>
                        <span className="font-semibold">
                          {(item.preco * item.quantidade).toLocaleString()} Db
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-blue-200 pt-2 mt-2 flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-blue-600">
                        {getCartTotal().toLocaleString()} Db
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Endereço de Entrega
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Endereço completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Telefone de Contato
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+239 999 9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Método de Pagamento
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Dinheiro na Entrega</option>
                    <option>Transferência Bancária</option>
                    <option>Mobile Money</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setCartItems([]);
                    closeModal();
                    alert("Pedido realizado com sucesso!");
                  }}
                  className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
                >
                  Confirmar Pedido
                </button>
              </div>
            )}

            {modalType === "detalhes" && selectedOrder && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    Código da Entrega
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedOrder.id}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-gray-600 mb-2">
                      Cliente
                    </div>
                    <div className="font-semibold">{selectedOrder.cliente}</div>
                    <div className="text-sm text-gray-600">
                      {selectedOrder.telefone}
                    </div>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-gray-600 mb-2">
                      Entregador
                    </div>
                    <div className="font-semibold">
                      {selectedOrder.entregador}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="text-sm font-semibold text-gray-600 mb-2">
                    Origem
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin
                      size={16}
                      className="text-blue-600 mt-1 flex-shrink-0"
                    />
                    <span>{selectedOrder.origem}</span>
                  </div>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="text-sm font-semibold text-gray-600 mb-2">
                    Destino
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin
                      size={16}
                      className="text-red-600 mt-1 flex-shrink-0"
                    />
                    <span>{selectedOrder.destino}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-gray-600 mb-2">
                      Data e Hora
                    </div>
                    <div>
                      {selectedOrder.data} às {selectedOrder.horario}
                    </div>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-gray-600 mb-2">
                      Valor
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {selectedOrder.valor}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="text-sm font-semibold text-gray-600 mb-2">
                    Status
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border inline-block ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>

                <button
                  onClick={closeModal}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Fechar
                </button>
              </div>
            )}

            {modalType === "atribuir-entregador" && selectedOrder && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="text-sm text-gray-600">Entrega</div>
                  <div className="text-xl font-bold">
                    {selectedOrder.id} - {selectedOrder.cliente}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {selectedOrder.destino}
                  </div>
                </div>

                <div className="text-lg font-semibold mb-3">
                  Selecione um Entregador:
                </div>

                <div className="space-y-3">
                  {entregadores
                    .filter((e) => e.status === "ativo")
                    .map((entregador) => (
                      <div
                        key={entregador.id}
                        className="border-2 border-gray-200 p-4 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold">{entregador.nome}</div>
                            <div className="text-sm text-gray-600">
                              {entregador.veiculo} - {entregador.placa}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {entregador.entregas_hoje} entregas hoje •{" "}
                              {entregador.avaliacao}
                            </div>
                          </div>
                          <button
                            onClick={closeModal}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                          >
                            Atribuir
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                <button
                  onClick={closeModal}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold mt-4"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Main Content Router
  const renderContent = () => {
    if (userType === "admin") {
      switch (currentView) {
        case "dashboard":
          return <DashboardAdmin />;
        case "entregas":
          return <EntregasView />;
        case "produtos":
          return <ProdutosView />;
        case "entregadores":
          return <EntregasView />;
        default:
          return <DashboardAdmin />;
      }
    } else if (userType === "entregador") {
      switch (currentView) {
        case "minhas-entregas":
          return <EntregasView />;
        case "dashboard":
          return <DashboardAdmin />;
        default:
          return <DashboardAdmin />;
      }
    } else {
      switch (currentView) {
        case "inicio":
          return <InicioCliente />;
        case "servicos":
          return <ServicosEntrega />;
        case "loja":
          return <LojaCliente />;
        case "favoritos":
          return <FavoritosView />;
        case "rastrear":
          return <RastreamentoView />;
        case "historico-compras":
          return <HistoricoComprasView />;
        default:
          return <InicioCliente />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CarrinhoLateral />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
      <Modal />
    </div>
  );
};

export default AidronExpressApp;

// script.js - lógica mínima para buscar, mostrar dica aleatória, favoritar e copiar

const tips = [
  { id: 1, title: 'Contando números', text: 'Pratique contar de 1 a 20 em voz alta. Conte objetos ao seu redor para treinar.', tags:['contagem'] },
  { id: 2, title: 'Somar com desenhos', text: 'Desenhe maçãs para representar duas quantidades e some-as desenhando todas juntas.', tags:['adição','visual'] },
  { id: 3, title: 'Subtrair com retalhos', text: 'Se tem 7 bolinhas e tira 3, risque 3 e conte as que sobraram: 4.', tags:['subtração','visual'] },
  { id: 4, title: 'Dobro e metade', text: 'Dobrar significa juntar duas vezes. Metade divide em duas partes iguais.', tags:['dobro & metade','noções'] },
  { id: 5, title: 'Formas geométricas', text: 'Aprenda círculo, quadrado, triângulo e retângulo: desenhe e pinte cada uma.', tags:['geometria','formas'] },
  { id: 6, title: 'Medir com régua', text: 'Use uma régua para medir objetos em centímetros. Compare qual é maior ou menor.', tags:['medidas','comprimento'] },
  { id: 7, title: 'Horas cheias', text: 'Mostre horas no relógio: quando o ponteiro menor aponta para 3, são 3 horas.', tags:['tempo','horas'] },
  { id: 8, title: 'Moedas simples', text: 'Reconheça moedas: 1 real, 50 centavos. Junte moedas para formar valores.', tags:['dinheiro','moedas'] },
  { id: 9, title: 'Tabuada do 2', text: 'Pratique: 2,4,6,8,10... Conte de dois em dois para aprender a tabuada do 2.', tags:['tabuada','multiplicação'] },
  { id: 10, title: 'Padrões e sequências', text: 'Observe e continue padrões: círculo, quadrado, círculo, quadrado... qual vem depois?', tags:['padrões'] },
  { id: 11, title: 'Comparar números', text: 'Use sinais > , < e = para comparar quantidades: 5 > 3 (5 é maior que 3).', tags:['comparar','números'] },
  { id: 12, title: 'Resolver problema com desenho', text: 'Leia o problema, desenhe o que acontece e resolva contando ou somando.', tags:['estratégia','problemas'] }
]

const tipsList = document.getElementById('tipsList')
const favoritesList = document.getElementById('favoritesList')
const searchInput = document.getElementById('search')
const randomBtn = document.getElementById('randomBtn')

// localStorage para favoritar
const STORAGE_KEY = 'math_tips_favorites'

function loadFavorites(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  }catch(e){
    console.error('Erro ao carregar favoritos',e)
    return []
  }
}

function saveFavorites(arr){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
}

let favorites = loadFavorites()

function createTipCard(t){
  const li = document.createElement('li')
  li.className = 'tip-card'
  li.dataset.id = t.id

  const h = document.createElement('h3')
  h.textContent = t.title

  const p = document.createElement('p')
  p.textContent = t.text

  const tags = document.createElement('div')
  tags.style.marginTop = '8px'
  tags.style.fontSize = '12px'
  tags.style.color = 'rgba(255,255,255,0.6)'
  tags.textContent = t.tags.join(' • ')

  const actions = document.createElement('div')
  actions.className = 'tip-actions'

  const favBtn = document.createElement('button')
  favBtn.textContent = isFavorited(t.id) ? 'Remover' : 'Favoritar'
  favBtn.addEventListener('click', ()=> toggleFavorite(t))

  const copyBtn = document.createElement('button')
  copyBtn.textContent = 'Copiar'
  copyBtn.addEventListener('click', ()=> copyTip(t))

  actions.appendChild(favBtn)
  actions.appendChild(copyBtn)

  li.appendChild(h)
  li.appendChild(p)
  li.appendChild(tags)
  li.appendChild(actions)

  if(isFavorited(t.id)) li.classList.add('favorited')

  return li
}

function isFavorited(id){
  return favorites.includes(id)
}

function toggleFavorite(tip){
  if(isFavorited(tip.id)){
    favorites = favorites.filter(id => id !== tip.id)
  } else {
    favorites.push(tip.id)
  }
  saveFavorites(favorites)
  render()
}

async function copyTip(tip){
  const text = `${tip.title}\n${tip.text}`
  try{
    await navigator.clipboard.writeText(text)
    alert('Dica copiada para a área de transferência!')
  }catch(e){
    // fallback
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
    alert('Dica copiada (fallback).')
  }
}

function render(){
  // render dicas filtradas
  const q = searchInput.value.trim().toLowerCase()
  const filtered = tips.filter(t => {
    if(!q) return true
    return t.title.toLowerCase().includes(q) || t.text.toLowerCase().includes(q) || t.tags.join(' ').toLowerCase().includes(q)
  })

  tipsList.innerHTML = ''
  filtered.forEach(t => tipsList.appendChild(createTipCard(t)))

  // render favoritos
  favoritesList.innerHTML = ''
  favorites.map(id => tips.find(t => t.id === id)).filter(Boolean).forEach(t => favoritesList.appendChild(createTipCard(t)))
}

function showRandom(){
  const idx = Math.floor(Math.random() * tips.length)
  const tip = tips[idx]
  // preencher modal
  const modal = document.getElementById('tipModal')
  const modalTipTitle = document.getElementById('modalTipTitle')
  const modalTipText = document.getElementById('modalTipText')
  const modalCopy = document.getElementById('modalCopy')
  const modalClose = document.getElementById('modalClose')
  const modalCloseFooter = document.getElementById('modalCloseFooter')

  modalTipTitle.textContent = tip.title
  modalTipText.textContent = tip.text
  modal.setAttribute('aria-hidden', 'false')

  function closeModal(){
    modal.setAttribute('aria-hidden','true')
    // remover listeners para evitar acúmulo
    modalCopy.removeEventListener('click', onCopy)
    modalClose.removeEventListener('click', onClose)
    modalCloseFooter.removeEventListener('click', onClose)
  }

  function onClose(){ closeModal() }

  async function onCopy(){
    try{
      await navigator.clipboard.writeText(`${tip.title}\n\n${tip.text}`)
      // feedback simples
      modalCopy.textContent = 'Copiado ✓'
      setTimeout(()=> modalCopy.textContent = 'Copiar', 1500)
    }catch(e){
      alert('Não foi possível copiar.')
    }
  }

  modalCopy.addEventListener('click', onCopy)
  modalClose.addEventListener('click', onClose)
  modalCloseFooter.addEventListener('click', onClose)
}

searchInput.addEventListener('input', ()=> render())
randomBtn.addEventListener('click', showRandom)

// primeira renderização
render()

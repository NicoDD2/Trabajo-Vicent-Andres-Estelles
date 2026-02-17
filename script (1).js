/* ── RELOJ (tu código original adaptado) ── */
function actualizarReloj() {
    const ahora = new Date();
    const h = String(ahora.getHours()).padStart(2, '0');
    const m = String(ahora.getMinutes()).padStart(2, '0');
    const s = String(ahora.getSeconds()).padStart(2, '0');
    document.getElementById('reloj-hora').textContent = `${h}:${m}:${s}`;

    const dias  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    const meses = ['enero','febrero','marzo','abril','mayo','junio',
                   'julio','agosto','septiembre','octubre','noviembre','diciembre'];
    document.getElementById('reloj-fecha').textContent =
        `${dias[ahora.getDay()]}, ${ahora.getDate()} de ${meses[ahora.getMonth()]} de ${ahora.getFullYear()}`;
}
actualizarReloj();
setInterval(actualizarReloj, 1000);


/* ── CITA DEL DÍA ── */
const citas = [
    { texto: "M'agrada la llum, el vent, la pols daurada del camp.", obra: "Llibre de meravelles" },
    { texto: "Vine, amor, vine, que la nit és nostra i el món és gran.", obra: "Les pedres de l'àmfora" },
    { texto: "Escric tal com parle, camine pel carrer, compre el diari.", obra: "Poesia completa" },
    { texto: "La pàtria és una cosa que es duu dins, com el cor o la sang.", obra: "Mural del País Valencià" },
    { texto: "Estimem-nos, amor, com si demà no haguera de vindre.", obra: "La clau que obri tots els panys" },
    { texto: "Sóc de Burjassot. Això vol dir que he crescut entre camps i cel blau.", obra: "Horacianes" },
    { texto: "La mort no és res. És un silenci més llarg que els altres silencis.", obra: "Primer llibre de les èglogues" },
];

function mostrarCita() {
    const hoy = new Date();
    const diaDelAnyo = Math.floor((hoy - new Date(hoy.getFullYear(), 0, 0)) / 86400000);
    const cita = citas[diaDelAnyo % citas.length];
    document.getElementById('cita-texto').textContent = cita.texto;
    document.getElementById('cita-origen').textContent = `— ${cita.obra}`;
}
mostrarCita();


/* ── TRADUCTOR VALENCIANO ── */
const diccES_VAL = {
    "hola":"hola", "buenos días":"bon dia", "buenas tardes":"bona vesprada", "buenas noches":"bona nit",
    "gracias":"gràcies", "por favor":"per favor", "sí":"sí", "no":"no",
    "casa":"casa", "agua":"aigua", "pan":"pa", "amor":"amor", "vida":"vida",
    "tierra":"terra", "cielo":"cel", "sol":"sol", "luna":"lluna",
    "madre":"mare", "padre":"pare", "hijo":"fill", "hija":"filla",
    "corazón":"cor", "lengua":"llengua", "palabra":"paraula",
    "libro":"llibre", "poema":"poema", "poeta":"poeta",
    "flor":"flor", "mar":"mar", "río":"riu", "ciudad":"ciutat", "pueblo":"poble",
    "amigo":"amic", "amiga":"amiga", "trabajo":"treball", "tiempo":"temps",
    "día":"dia", "noche":"nit", "tarde":"vesprada", "mañana":"demà",
    "ayer":"ahir", "hoy":"avui", "bien":"bé", "mal":"mal",
    "mucho":"molt", "poco":"poc", "grande":"gran", "pequeño":"menut",
    "bonito":"bonic", "hermoso":"formós", "blanco":"blanc", "negro":"negre",
    "rojo":"roig", "azul":"blau", "verde":"verd",
    "mujer":"dona", "hombre":"home", "niño":"xiquet", "niña":"xiqueta",
    "perro":"gos", "gato":"gat", "pájaro":"ocell",
};

const diccVAL_ES = Object.fromEntries(Object.entries(diccES_VAL).map(([k, v]) => [v, k]));

function traducir() {
    const texto     = document.getElementById('traductor-entrada').value.trim();
    const direccion = document.getElementById('traductor-direccion').value;
    const resultado = document.getElementById('traductor-resultado');
    const estado    = document.getElementById('traductor-estado');

    if (!texto) {
        resultado.textContent = 'Escribe algo primero.';
        estado.textContent = '';
        return;
    }

    const dic = direccion === 'es-val' ? diccES_VAL : diccVAL_ES;
    const palabras = texto.toLowerCase().split(/\s+/);
    let traducidas = 0;

    const traduccion = palabras.map(p => {
        const limpia = p.replace(/[.,;:!?¡¿«»"'()]/g, '');
        const puntuacion = p.slice(limpia.length);
        if (dic[limpia]) { traducidas++; return dic[limpia] + puntuacion; }
        return p;
    });

    resultado.textContent = traduccion.join(' ');
    estado.textContent = `${traducidas} de ${palabras.length} palabras traducidas`;
}

document.getElementById('traductor-entrada').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); traducir(); }
});

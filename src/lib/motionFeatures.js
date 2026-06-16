// Features de animación de framer-motion, cargadas de forma diferida (async)
// por LazyMotion. Así NO entran al bundle inicial: el JS que bloquea la
// primera pintura queda liviano y estas features llegan en un chunk aparte.
import { domMax } from "framer-motion";
export default domMax;

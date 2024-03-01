import React from "react";
import styles from "./Mortgages.module.css";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Info } from "react-feather";
import { states } from "@/utils";

const Mortgages = () => {
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.card}>
          <Link href="/">
            <ChevronLeft /> Volver
          </Link>

          <div className={styles.field}>
            <p>Estado</p>
            <select name="" id="">
              {states.map((state) => (
                <option key={state.clave} value={state.nombre}>
                  {state.nombre}
                </option>
              ))}
            </select>
          </div>

          <div
            className={styles.field}
            title="La provincia, tipo de vivienda y el uso influyen en el precio y los impuestos de la hipoteca."
          >
            <p>
              Uso de vivienda <Info size={18} color="var(--main-color)" />{" "}
            </p>
            <select name="" id="">
              <option value="Segunda mano (usada)">Segunda mano (usada)</option>
              <option value="Obra nueva">Obra nueva</option>
            </select>
          </div>

          <div className={styles.field}>
            <p>Tipo de vivienda</p>
            <select name="" id="">
              <option value="Segunda mano (usada)">Habitual</option>
              <option value="Obra nueva">Segunda vivienda</option>
            </select>
          </div>

          <div className={styles.field}>
            <p>Precio de la vivienda</p>
            <input type="number" placeholder="0" />
          </div>

          <div
            className={styles.field}
            title="Un plazo mayor conlleva pagar más intereses pero tiene una cuota mensual más baja. Un plazo inferior te ofrece una mayor cuota mensual pero disminuye el coste total de la hipoteca."
          >
            <p>
              Plazo a devolver <Info size={18} color="var(--main-color)" />{" "}
            </p>
            <select name="" id="">
              <option value="">20 años</option>
              <option value="">25 años</option>
              <option value="">30 años</option>
              <option value="">35 años</option>
            </select>
          </div>

          <div
            className={styles.field}
            title="La cantidad mínima recomendable es un 20% del precio de compra venta de la vivienda"
          >
            <p>
              Ahorro aportado <Info size={18} color="var(--main-color)" />{" "}
            </p>
            <input type="number" />
          </div>

          <div className={styles.field}>
            <p>¿Cómo llevas la búsqueda de tu futura vivienda?</p>
            <select name="" id="">
              <option value="">He hecho una reserva</option>
              <option value="">Tengo mi vivienda ya elegida</option>
              <option value="">Aún estoy decidiendo la mejor</option>
              <option value="">Estoy explorando opciones</option>
              <option value="">Solo quiero información</option>
            </select>
          </div>

          <div className={styles.field}>
            <p>¿Cuándo planeas comprar?</p>
            <select name="" id="">
              <option value="">Dentro de 3 meses</option>
              <option value="">Dentro de 6 meses</option>
              <option value="">Dentro de 1 año o más</option>
            </select>
          </div>

          <div className={styles.btn}>
            <button>Simular mi hipoteca</button>
          </div>

          <p className={styles.info}>
            Itaaj Realty no actúa como intermediario financiero a los efectos de
            la Ley 5/2019 de crédito inmobiliario. La información facilitada es
            meramente orientativa, no supone una oferta contractual ni la
            aprobación de la operación por parte de la entidad de crédito, y
            está basada en información pública disponible sobre los préstamos
            hipotecarios ofrecidos en el mercado por las entidades de crédito.
            Serán las propias entidades de crédito y, en su caso actuando como
            intermediario por cuenta de estas, las que, tras el estudio del caso
            concreto del potencial cliente, contactarán con el potencial
            prestatario y le proporcionarán directamente las condiciones
            financieras que puedan resultar de aplicación al caso concreto.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <h2>¿Cómo calcular una hipoteca?</h2>

        <ul>
          <li>
            <div className={styles.number}>1</div>
            <div>
              <h3>Introduce los datos de la vivienda que vas a comprar</h3>
              <p>
                El coste, dónde la compras, el estado de la vivienda y si será
                tu residencia habitual. Para calcular la hipoteca necesitarás
                también conocer los ahorros que aportas para cubrir los gastos y
                el plazo en el que querrás devolver el importe más los
                intereses.
              </p>
            </div>
          </li>

          <li>
            <div className={styles.number}>2</div>
            <div>
              <h3>Consulta la cuota que pagarás cada mes</h3>
              <p>
                Al tratarse de una simulación será un dato aproximado basado en
                un tipo de interés fijo medio.
              </p>
            </div>
          </li>

          <li>
            <div className={styles.number}>3</div>
            <div>
              <h3>Comprueba qué bancos podrían ofrecerte una hipoteca</h3>
              <p>
                Descubre las ofertas de los distintos bancos para saber cuál te
                interesa más.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Preguntas frecuentes sobre hipotecas</h2>
        <details>
          <summary>¿Qué es mejor, hipoteca fija o variable?</summary>
          <p>
            Al final, todo dependerá de tu perfil. Las hipotecas fijas te
            ofrecen la tranquilidad de saber que siempre pagarás lo mismo de
            hipoteca. Las hipotecas variables, te permiten aprovechar las
            bajadas del Euríbor, pero también aumentará tu cuota cuando el
            Euribor aumente.
          </p>
        </details>
        <details>
          <summary>¿Qué es una hipoteca mixta?</summary>
          <p>
            Las hipotecas mixtas son un híbrido entre las hipotecas fijas y las
            variables. Con una hipoteca mixta pagarás un tipo fijo durante unos
            años (entre 5 y 20 años dependiendo de la entidad) y después
            pasarías a un tipo variable. La ventaja de la hipoteca mixta es que
            nos permite conseguir un tipo fijo más bajo.
          </p>
        </details>
        <details>
          <summary>
            ¿Pueden obligarme a coontratar seguros con la hipoteca?
          </summary>
          <p>
            Los seguros forman parte de lo que antes de la Ley Hipotecaria se
            conocían como “vinculaciones”. Con esta nueva legislación, se
            prohibió a las entidades obligar a contratar vinculaciones y pasamos
            a hablar de bonificaciones. Ninguna entidad puede obligarte a
            contratar seguros con tu hipoteca, lo que sí puede ofrecerte son
            bonificaciones en el tipo de interés. Por ejemplo, una entidad puede
            ofrecerte una hipoteca fija con un tipo de interés del 2,5% sin
            seguros. Pero, si contratas un seguro del hogar, te ofrece una
            bonificación del 0,3%, por lo que tu tipo de interés pasaría a ser
            del 2,2%. Las bonificaciones pueden ser, como máximo, del 1,5%.
          </p>
        </details>
        <details>
          <summary>¿Quién paga los gastos de la hipoteca?</summary>
          <p>
            Al comprar una vivienda tenemos que distinguir entre dos escrituras.
            Por un lado, está la escritura de la hipoteca. Los gastos e
            impuestos de esta, desde la aprobación de la Ley Hipotecaria, los
            tiene que pagar el banco. El único gasto relacionado con esta
            escritura que tendrá que pagar el comprador es la tasación de la
            vivienda. Por otro lado, está la escritura de compraventa. Los
            gastos e impuestos de esta, como notaría o registro, los abonará el
            comprador. A ello tenemos que sumar el Impuesto de Transmisiones
            Patrimoniales (ITP) que varía según la Comunidad Autónoma. El ITP lo
            abonará también el comprador.
          </p>
        </details>
        <details>
          <summary>
            ¿Cuál es la cantidad máxima que me darán con la hipoteca?
          </summary>
          <p>
            Por norma general, las entidades ofrecen una financiación de, como
            máximo, el 80% del valor más bajo entre el precio de compraventa y
            el valor de tasación. Algunas entidades pueden llegar a ofrecer
            hasta un 90% de financiación.
          </p>
        </details>
        <details>
          <summary>
            ¿Qué tengo que tener en cuenta para comprar hipotecas?
          </summary>
          <p>
            Lo primero que tenemos que hacer antes de ponernos a estudiar lo que
            el mercado nos ofrece, es estudiar bien nuestro perfil. Tus
            ingresos, tipo de contrato, número de titulares, edad, etc. Una vez
            conozcamos bien nuestra situación, llega el momento de buscar las
            entidades que se ajustan a nuestras necesidades. Y, cuando tenemos
            varias ofertas, tendremos que comparar los tipos de interés y las
            bonificaciones de cada uno. Tanto para estudiar tu perfil, como para
            conseguir varias ofertas, lo ideal si no conoces este tipo de
            gestiones es recurrir a un experto hipotecario. Los expertos de
            Fotocasa Hipotecas te acompañarán en todo el proceso de contratación
            de tu hipoteca de forma completamente gratuita.
          </p>
        </details>
        <details>
          <summary>¿Es mejor plazo largo o corto?</summary>
          <p>
            Nuevamente, y como ocurre cuando comparamos los diferentes tipos de
            interés, todo dependerá de tu perfil. Si tienes un plazo largo, en
            conjunto tu hipoteca será más cara, porque pagarás más intereses,
            pero tu cuota mensual será más baja. En cambio, si el plazo de
            amortización es corto, la cuota mensual será más alta, pero pagarás
            menos intereses a largo plazo.
          </p>
        </details>
      </section>
    </div>
  );
};

export default Mortgages;

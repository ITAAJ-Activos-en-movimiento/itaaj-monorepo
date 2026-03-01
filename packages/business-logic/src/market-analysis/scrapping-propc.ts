import puppeteer from "puppeteer";


interface PropertyData {
    precios: {
      vista: { precio: number };
      contrato: number | null;
      principal: number | null;
    };
    m2T: number;
    m2C: number;
    recamaras: number;
    banos: number;
    fechaAlta: string;
    fechaModificacion: string;
  }
export const PropiedadesScrapping = async () => {
    const mainUrl = "https://propiedades.com/lomas-de-tecamachalco-naucalpan-de-juarez/residencial-venta"

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
        slowMo: 10,
        defaultViewport: null
    });

    const page = await browser.newPage();

    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");

    await page.goto(mainUrl, {
        waitUntil: 'networkidle2',
        timeout: 90000
    });

    await page.waitForSelector('.properties-cards');
    await new Promise((r) => setTimeout(r, 4000));


        const properties: PropertyData[] = await page.evaluate(() => {
            const propertyCards = Array.from(document.querySelectorAll('.properties-cards .ibdnfh'));
            return propertyCards.map(section => {
                const precio = section.querySelector('.sc-402fc8bf-2.gZKFMl')?.textContent || '';
                const habitaciones = section.querySelectorAll('.amenities .amenities-number')[0]?.textContent || '';
                const baños = section.querySelectorAll('.amenities .amenities-number')[1]?.textContent || '';
                const tamaño = section.querySelectorAll('.amenities .amenities-number')[2]?.textContent || '';
                const direccion = section.querySelector('.pcom-property-card-body-main-info-street h3')?.textContent || '';
                console.log(tamaño)
                return {
                    precios: {
                     vista : {
                        precio: Number(precio.replace('$', '').replace(/,/g, '').replace(' MXN', '')),
                    
                    },
                    contrato: 0,
                    principal: 0
                    },
                    recamaras: Number(habitaciones),
                    banos: Number(baños),
                    m2T: 0,
                    m2C: Number(tamaño.replace("m2", "")),
                    fechaAlta: "",
                    fechaModificacion: ""
                };
            });
          });
          await browser.close();
    return properties;

}


  
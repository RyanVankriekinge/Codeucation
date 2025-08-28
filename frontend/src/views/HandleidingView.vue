<template>
    <main>
        <div class="outer-wrapper">
            <div class="wrapper">
                <div class="section">
                    <div class="full-width">
                        <h1 style="width: 100%;">Handleiding</h1>
                        <p>Hieronder volgt een beknopte handleiding voor het gebruik van de website. Deze handleiding
                            legt stap voor stap uit hoe de belangrijkste functionaliteiten werken, zodat de applicatie
                            vlot gebruikt kan worden.</p>
                    </div>
                    <div class="full-width">
                        <h2>Registreren</h2>
                        <p>Om de applicatie te gebruiken, dien je eerst een account aan te maken. <br></br>Dit kan je
                            hier doen:</p>
                        <button class="big-button" @click="goToRegister">
                            Ga aan de slag!
                        </button>
                        <p>Je zult onderstaand scherm te zien krijgen. Vul je gegevens in, selecteer het juiste profiel
                            (leraar of leerling) en je kan meteen aan de slag!</p>
                        <img src="../assets/img/Registreer.png"></img>
                    </div>
                    <h2>Klassen bekijken</h2>
                    <p>Na het inloggen, krijgt de leraar een overzicht te zien van alle klassen. Hierop is de naam
                        van de klas, de school en het aantal leerlingen
                        zichtbaar. Als er doorgeklikt wordt op de klas, worden de gekoppelde cursussen en de
                        leerlingen uit deze klas getoond.
                    </p>
                    <p style="margin-bottom: 0px;">Voorbeeld klas:</p>
                    <img src="../assets/img/klas.png" style="max-width: 300px;"></img>
                    <p>Van hieruit kan de cursusinfo van bijhorende cursussen bekeken worden, alsook de individuele
                        voortgang van de leerlingen.</p>
                    <p>Wat je te zien zal krijgen:</p>
                    <img src="../assets/img/klaspagina.png"></img>
                    <h3>Voortgang van leerlingen</h3>
                    <p>Door op de naam van een leerling te klikken, kan je de voortgang van deze leerling bekijken per
                        cursus en per oefening.</p>
                    <img src="../assets/img/voortgangleerling.png" style="max-width: 650px;"></img>
                    <p>Bovenaan kan je naar een andere cursus wisselen, indien deze leerling gekoppeld is aan meerdere
                        cursussen. Elk hoofdstuk kan opengeklikt worden
                        om zo de verschillende oefeningen te zien. In dit geval heeft Emma Vermeulen nog geen oefeningen
                        gemaakt, dus zijn de balkjes nog leeg.
                    </p>

                    <h2>Cursussen bekijken</h2>
                    <p>De cursussen onderaan de klaspagina kunnen worden aangeklikt om naar het cursusoverzicht te gaan.
                    </p>

                    <img src="../assets/img/cursus.png"></img>
                    <p>Met de klassen onderaan kan je gemakkelijk terug naar het klasoverzicht gaan.</p>
                    <h3>Een cursus leren</h3>
                    <p>Als leraar heb je de optie om een cursus aan te leren voor je deze aan je leerlingen aanleert.
                        Dat kan via de knop 'Leer deze cursus'. Je zult dan op een overzichtspagina terecht komen van
                        alle hoofstukken,
                        waar je je persoonlijke voortgang kan bekijken.</p>
                    <img src="../assets/img/cursusleren.png"></img>
                    <p>Je kan makkelijk verdergaan in het hoofdstuk waar je aan bezig was, of je kan een ander hoofdstuk
                        kiezen.
                        Rechts zie je een overzicht van alle oefeningen, zodat je snel naar een oefening kan gaan.</p>
                    <h2>Oefeningen maken</h2>
                    <p>Via de cursus kom je terecht bij de oefeningen. Deze kunnen apart geopend worden om ze te maken
                        in de code
                        editor. Hier zie je de naam van de oefening, bij welk hoofdstuk deze hoort en uit welke cursus
                        het bijhorend
                        hoofstuk komt.</p>
                    <p> Boven het invoerveld bevindt zich een selectievak, waarin er makkelijk tussen oefeningen kan
                        worden gewisseld.</p>
                    <img src="../assets/img/oefening.png"></img>
                    <p>Nadat je de code geschreven hebt, kan je de testen of je oefening correct is door op 'code
                        testen' te klikken. Je zult dan
                        te zien krijgen of alle vooraf geprogrammeerde testen geslaagd zijn.
                    </p>
                    <img src="../assets/img/feedback.png"></img>
                    <p>In dit voorbeeld staat er een kleine typefout in de zin die gereturnd wordt. Dat zie je ook in de
                        feedback.</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();


function goToRegister() {
    router.push('/register');
}
</script>
<style scoped>
.section {
    flex-wrap: wrap;
    margin-bottom: 100px;
    gap: 5px;
}

.full-width {
    width: 100%;
}

img {
    width: 100%;
    max-width: 800px;
}

h2,
h3 {
    margin-top: 20px;
    width: 100%;
}

p {
    width: 100%;
    margin-top: 5px;
}

button {
    margin-bottom: 10px;
}
</style>

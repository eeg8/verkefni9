// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
    let domains;
    function displayDomain(domainList) {


        const [{ domain }] = domainList;
        const [{ registered }] = domainList;
        const [{ lastChange }] = domainList;
        const [{ expires }] = domainList;
        const [{ registrantname }] = domainList;
        const [{ email }] = domainList;
        const [{ address }] = domainList;
        const [{ country }] = domainList;
    
        
        const dl1 = document.createElement('dl');
        const dl2 = document.createElement('dl');
        const dl3 = document.createElement('dl');
        const dl4 = document.createElement('dl');
        const dl5 = document.createElement('dl');
        const dl6 = document.createElement('dl');
        const dl7 = document.createElement('dl');
        const dl8 = document.createElement('dl');

        const domainElement = document.createElement('dt');
        const registeredElement = document.createElement('dt');
        const lastChangeElement = document.createElement('dt');
        const expiresElement = document.createElement('dt');
        const registrantnameElement = document.createElement('dt');
        const emailElement = document.createElement('dt');
        const addressElement = document.createElement('dt');
        const countryElement = document.createElement('dt');

        const domainValueElement = document.createElement('dd');
        const registeredValueElement = document.createElement('dd');
        const lastChangeValueElement = document.createElement('dd');
        const expiresValueElement = document.createElement('dd');
        const registrantnameValueElement = document.createElement('dd');
        const emailValueElement = document.createElement('dd');
        const addressValueElement = document.createElement('dd');
        const countryValueElement = document.createElement('dd');

        domainElement.appendChild(document.createTextNode('Lén'));
        registeredElement.appendChild(document.createTextNode('Skráð'));
        lastChangeElement.appendChild(document.createTextNode('Seinast breytt'));
        expiresElement.appendChild(document.createTextNode('Rennur út'));
        registrantnameElement.appendChild(document.createTextNode('Skráningaraðili'));
        emailElement.appendChild(document.createTextNode('Netfang'));
        addressElement.appendChild(document.createTextNode('Heimilisfang'));
        countryElement.appendChild(document.createTextNode('Land'));

        domainValueElement.appendChild(document.createTextNode(domain));
        registeredValueElement.appendChild(document.createTextNode(timi(registered)));
        lastChangeValueElement.appendChild(document.createTextNode(timi(lastChange)));
        expiresValueElement.appendChild(document.createTextNode(timi(expires)));
        registrantnameValueElement.appendChild(document.createTextNode(registrantname));
        emailValueElement.appendChild(document.createTextNode(email));
        addressValueElement.appendChild(document.createTextNode(address));
        countryValueElement.appendChild(document.createTextNode(country));

        dl1.appendChild(domainElement);
        dl2.appendChild(registeredElement);
        dl3.appendChild(lastChangeElement);
        dl4.appendChild(expiresElement);
        dl5.appendChild(registrantnameElement);
        dl6.appendChild(emailElement);
        dl7.appendChild(addressElement);
        dl8.appendChild(countryElement);

        dl1.appendChild(domainValueElement);
        dl2.appendChild(registeredValueElement);
        dl3.appendChild(lastChangeValueElement);
        dl4.appendChild(expiresValueElement);
        dl5.appendChild(registrantnameValueElement);
        dl6.appendChild(emailValueElement);
        dl7.appendChild(addressValueElement);
        dl8.appendChild(countryValueElement);

        const container = domains.querySelector('.results');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        erTomur(container, dl1, domainValueElement);
        erTomur(container, dl2, registeredValueElement);
        erTomur(container, dl3, lastChangeValueElement);
        erTomur(container, dl4, expiresValueElement);
        erTomur(container, dl5, registeredValueElement);
        erTomur(container, dl6, emailValueElement);
        erTomur(container, dl7, addressValueElement); //container.appendChild(dl7);
        erTomur(container, dl8, countryValueElement);
    }

    function erTomur(e, dlGildi, ddGildi) {
        if (ddGildi.innerText === "") { console.log('yo'); return;}
        else {return e.appendChild(dlGildi); }
    }

    function displayError(error) {
        const container = domains.querySelector('.results');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(document.createTextNode(error));
    }
    
    function timi(x) {
        var st = new Date(x);
        d = st.getDate();
        if(d<10) {
            d='0'+d;
        }
        m = (st.getMonth()+1);
        if(m<9) {
            m='0'+m;
        }
        y =st.getFullYear();
        return (y +'-'+m +'-'+ d);
    }

      function loadingMynd(){
        const setjaInn = document.createElement('div');
        const mynd = document.createElement('img');
        const texti = document. createElement('p');
        setjaInn.setAttribute('class', 'loading');
        mynd.setAttribute('src', 'img/loading.gif');
        setjaInn.appendChild(mynd);
    
        texti.appendChild(document.createTextNode('Leita að léni...'))
        setjaInn.appendChild(texti);

        const container = domains.querySelector('.results');
        container.appendChild(setjaInn);
      }


    function fetchData(number) {
        fetch(`${API_URL}${number}`)
          .then( 
            loadingMynd()
          )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const container = domains.querySelector('.results');
            container.removeChild(container.firstChild);
            displayDomain(data.results);
          })
          .catch((error) => {
            displayError('Lén er ekki skráð');
          })
        }

      function onSubmit(e) {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const container = domains.querySelector('.results');
    
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
    
        if(input.value == '') {
            displayError('Lén verður að vera strengur');
        }
        else {
            fetchData(input.value);
        }
      }
  function init(_domains) {
      domains = _domains;

      const form = domains.querySelector('form');
      form.addEventListener('submit', onSubmit);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
    const domains = document.querySelector('.domains');
    program.init(domains);
});

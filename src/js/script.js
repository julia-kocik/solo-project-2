/* eslint-disable no-undef */
{
  const navLinks = document.querySelectorAll('.links ul li a');
  const pages = document.querySelectorAll('.page');
  const hamburger = document.querySelector('.hamburger-btn a');
  const sidebarContent = document.querySelector('.sidebar');
  const content = document.querySelectorAll('.page-container');
  const not = document.querySelector('.not');
  const answer = document.querySelector('.answer');
  const messageInput = document.querySelector('.message-input');
  const answerBack = document.querySelector('.answer-back');

  const initPages = () => {
    const idFromHash = window.location.hash.replace('#', '');

    let pageMatchingHash = pages[0].id;

    for (let page of pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    activatePage(pageMatchingHash);

    for (const link of navLinks) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const id = event.currentTarget.getAttribute('href').replace('#', '');
        activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
  };

  const activatePage = (pageId) => {
    for (let page of pages) {
      page.classList.toggle('page-active', page.id == pageId);
    }
    for (let link of navLinks) {
      link.classList.toggle(
        'link-active',
        link.getAttribute('href') == '#' + pageId
      );
    }
  };

  const initSidebar = () => {
    hamburger.addEventListener('click', () => {
      sidebarContent.classList.toggle('sidebar-active');
    });
    for(let elem of content) {
      elem.addEventListener('click', () => {
        sidebarContent.classList.remove('sidebar-active');
      });
    }
  };

  //modals
  //close
  const closeBtns = document.querySelectorAll('.overlay');
  //console.log(closeBtns);

  const closeModal = () => {
    for(let btn of closeBtns) {
      btn.classList.remove('show');
    }
    answer.classList.remove('answer-active');
    answerBack.classList.remove('answer-active');
  };
  
  const activateCloseModal = () => {
    document.querySelectorAll('.overlay .js--close-modal').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
      });
    });

    for(let btn of closeBtns) {
      btn.addEventListener('click', function(e) {
        if(e.target === this) {
          closeModal();
        }
      });
    }

    document.addEventListener('keyup', function(e) {
      if(e.keyCode === 27) {
        closeModal();
      }
    });
  };
  
  const openModal = (modal) => {
    document.querySelectorAll('#overlay > *').forEach(function(modal) {
      modal.classList.remove('show');
    });
    if(modal == '#myModal') {
      document.querySelector('#overlay').classList.add('show');
    } else if(modal == '#quit') {
      document.querySelector('#overlay-quit').classList.add('show');
    }
    document.querySelector(modal).classList.add('show');
  };

  const activateOpenModal = () => {
    document.querySelector('.manager .name').addEventListener('click', (e) => {
      e.preventDefault();
      sidebarContent.classList.remove('sidebar-active');
      openModal('#myModal');
    });
    document.querySelector('.quit').addEventListener('click', (e) => {
      e.preventDefault();
      openModal('#quit');
    });
  };

  const alertNot = () => {
    not.addEventListener('click', (e) => {
      e.preventDefault();
      alert('You have no new notifications');
    });
  };

  const sendMessage = () => {
    document.querySelector('.send').addEventListener('click', (e) => {
      e.preventDefault();
      answer.textContent = messageInput.value;
      answer.classList.add('answer-active');
      answerBack.classList.add('answer-active');
    });
  };

  //chart
  var ctx = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line no-undef
 
  // eslint-disable-next-line no-unused-vars
  var chart = new Chart(ctx, {
    // 1
    type: 'bar',
    data: {
      // 2
      labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
      // 3
      datasets: [{
        // 4
        label: 'Signups',
        // 5
        backgroundColor: '#8DBEC8',
        borderColor: '#8DBEC8',
        // 6
        data: [ 52, 51, 41, 94, 26, 6, 72, 9, 21, 88 ],
      },
      {
        label: 'FTD',
        backgroundColor: '#F29E4E',
        borderColor: '#F29E4E',
        data: [ 6, 72, 1, 0, 47, 11, 50, 44, 63, 76 ],
      },
      {
        label: 'Earned',
        backgroundColor: '#71B374',
        borderColor: '#71B374',
        data: [ 59, 49, 68, 90, 67, 41, 13, 38, 48, 48 ],
        // 7
        hidden: true,
      }]
    },
  });

  const initDatePicker = () => {
  //flatpkr
  // eslint-disable-next-line no-undef
    flatpickr('#date-start', {});
    // eslint-disable-next-line no-undef
    flatpickr('#date-end', {});
  };
  

  const app = () => {
    initPages();
    initSidebar();
    activateCloseModal();
    activateOpenModal();
    initDatePicker();
    alertNot();
    sendMessage();
  };

  app();
}
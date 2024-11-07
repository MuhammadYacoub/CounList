
    // Fetch the data from "simpledata.json"
    let allEmployeesData = []; // تخزين البيانات المحملة هنا

    // تحميل البيانات وتطبيق التصفية مباشرةً
    fetch("Data/simpledata.json")
      .then((response) => response.json())
      .then((data) => {
        allEmployeesData = data; // تخزين البيانات في المتغير
        populateCards(data);      // توليد البطاقات مرة واحدة
        initializeFilters(data);   // تهيئة الفلاتر
        setupEventListeners();     // إعداد الاستماع للأحداث
      })
      .catch((error) => console.error("Error fetching data:", error));
    
    // تهيئة البطاقات في الصفحة لمرة واحدة فقط
    function populateCards(data) {
      const cardContainer = document.getElementById("employeeCardContainer");
      cardContainer.innerHTML = "";
    
      data.forEach((employee) => {
        const card = document.createElement("div");
        card.className = "employee-card";
        card.dataset.rank = employee.CurrentRankID;
        card.dataset.branch = employee.BranchName;
        card.dataset.section = employee.SectionName || "";
        card.dataset.sector = employee.SectorName;
        card.dataset.name = employee.Name.toLowerCase();
        card.innerHTML = `
          <div class="contact-card">
            <img src="images/judgepic 6-3-2023/${employee.ConsultantID}.jpg" alt="${employee.Name}" onerror="this.src='Images/logo PP.png';" class="employee-photo">
            <div class="employee-info">
                <h1 class="employee-name">${employee.Name}</h1>
                <p class="employee-rank">${employee.CurrentRankID} - رقم الأقدمية : ${employee.TimeRank}</p>
            </div>
          </div>
        `;
        card.onclick = () => displaySelectedRow(employee);
        cardContainer.appendChild(card);
      });
    }
    
    // تهيئة الفلاتر
    function initializeFilters(data) {
      populateFilterOptions("rankFilter", [...new Set(data.map(e => e.CurrentRankID))]);
      populateFilterOptions("branchFilter", [...new Set(data.map(e => e.BranchName))]);
      populateFilterOptions("sectionFilter", [...new Set(data.map(e => e.SectionName || ""))]);
      populateFilterOptions("sectorFilter", [...new Set(data.map(e => e.SectorName))]);
    }
    
    function populateFilterOptions(filterId, options) {
      const filterElement = document.getElementById(filterId);
      // filterElement.innerHTML = '<option value=""></option>';
      options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        filterElement.appendChild(opt);
      });
    }
    
    // إعداد أحداث التصفية والبحث
    function setupEventListeners() {
      const filters = ["rankFilter", "branchFilter", "sectionFilter", "sectorFilter"];
      filters.forEach(filter => {
        document.getElementById(filter).addEventListener("change", filterCards);
      });
      document.getElementById("searchInput").addEventListener("keyup", filterCards);
    }
    
    // دالة التصفية باستخدام إظهار وإخفاء العناصر
    function filterCards() {
      const rankValue = document.getElementById("rankFilter").value;
      const branchValue = document.getElementById("branchFilter").value;
      const sectionValue = document.getElementById("sectionFilter").value;
      const sectorValue = document.getElementById("sectorFilter").value;
      const searchValue = document.getElementById("searchInput").value.toLowerCase();
    
      let count = 0;
    
      document.querySelectorAll(".employee-card").forEach(card => {
        const matchesRank = !rankValue || card.dataset.rank === rankValue;
        const matchesBranch = !branchValue || card.dataset.branch === branchValue;
        const matchesSection = !sectionValue || card.dataset.section === sectionValue;
        const matchesSector = !sectorValue || card.dataset.sector === sectorValue;
        const matchesSearch = !searchValue || card.dataset.name.includes(searchValue);
    
        if (matchesRank && matchesBranch && matchesSection && matchesSector && matchesSearch) {
          card.style.display = "block";
          count++;
        } else {
          card.style.display = "none";
        }
      });
    
      document.getElementById("filteredRowCount").innerText = `عدد النتائج: ${count}`;
    }
    
    // عرض تفاصيل البطاقة في نافذة
    function displaySelectedRow(employee) {
      const modalBody = document.getElementById("selectedRowModalBody");
      modalBody.innerHTML = `
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <img id="employeePicture" src="images/judgepic 6-3-2023/${employee.ConsultantID}.jpg" alt="${employee.Name}" onerror="this.src='Images/logo PP.png';" class="fixed-size-image">
            </div>
            <div class="col-md-8">
              <h2 id="employeeName">${employee.Name}</h2>
              <p id="employeeDegree">الدرجة: ${employee.CurrentRankID}</p>
              <hr>
              <p>الفرع: ${employee.BranchName}</p>
              <p>الأقدمية: ${employee.TimeRank}</p>
            </div>
            <div class="col-12">
              <hr>
              <p id="employeeAddress">العنوان: ${employee.Address}</p>
              <p id="employeePhone">رقم الهاتف: 0${employee.PhoneNumber}</p>
              <button class="btn btn-success" onclick="window.location.href='https://wa.me/+200${employee.PhoneNumber}'">واتساب</button>
            </div>
          </div>
        </div>
      `;
      const modal = new bootstrap.Modal(document.getElementById("selectedRowModal"));
      modal.show();
    }
    
    // تفعيل الوضع الداكن
    document.addEventListener('DOMContentLoaded', function () {
      const darkModeToggle = document.getElementById('darkModeToggle');
      if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
      } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
      }
      darkModeToggle.addEventListener('change', function () {
        if (darkModeToggle.checked) {
          document.body.classList.add('dark-mode');
          localStorage.setItem('darkMode', 'enabled');
        } else {
          document.body.classList.remove('dark-mode');
          localStorage.setItem('darkMode', 'disabled');
        }
      });
    });
    

        // Dark Mode
        document.addEventListener('DOMContentLoaded', function () {
          const darkModeToggle = document.getElementById('darkModeToggle');

          // Check if user already has a preference
          if (localStorage.getItem('darkMode') === 'enabled') {
              document.body.classList.add('dark-mode');
              darkModeToggle.checked = true;
          } else if (localStorage.getItem('darkMode') === 'disabled') {
              document.body.classList.remove('dark-mode');
              darkModeToggle.checked = false;
          } else {
              // Set initial mode to light
              document.body.classList.remove('dark-mode');
              darkModeToggle.checked = false;
          }

          // Toggle function
          darkModeToggle.addEventListener('change', function () {
              if (darkModeToggle.checked) {
                  document.body.classList.add('dark-mode');
                  localStorage.setItem('darkMode', 'enabled');
              } else {
                  document.body.classList.remove('dark-mode');
                  localStorage.setItem('darkMode', 'disabled');
              }
          });
      });




      //login
      document.addEventListener('DOMContentLoaded', () => {
        // Trigger the modal to show as soon as the page is fully loaded
        $('#loginModal').modal({
            backdrop: 'static',   // Disable clicking outside the modal to close it
            keyboard: false       // Disable using the keyboard to close the modal
        });
        $('#loginModal').modal('show');
    });

      document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
    validateLogin() ;
    function validateLogin() {
      const nationalID = document.getElementById('username').value;
      const email = document.getElementById('password').value;
  
      // البحث عن المستخدم
      const user = allEmployeesData.find(
          (employee) => employee.EMail === email && employee.NationalID.toString() === nationalID
      );
  
      if (user) {
          // تسجيل الدخول ناجح
          $('#loginModal').modal('hide');
      } else {
          // بيانات غير صحيحة
          alert('البريد الإلكتروني أو الرقم القومي غير صحيح');
      }
  }
        
    ;
      
    });

  

    $(document).ready(function() {
      // تطبيق Select2 على الفلاتر مع Placeholder وقابلية المسح
      $('#rankFilter').select2({
          placeholder: "اختر الدرجة",
          allowClear: true
      });
      $('#branchFilter').select2({
          placeholder: "اختر الفرع",
          allowClear: true
      });
      $('#sectionFilter').select2({
          placeholder: "اختر القسم",
          allowClear: true
      });
      $('#sectorFilter').select2({
          placeholder: "اختر القطاع",
          allowClear: true
      });
  });
(function () {
    'use strict';

    angular
        .module('app')
        .run(lang);

    lang.$inject = ['$rootScope'];

    function lang($rootScope) {
		$rootScope.language = {};

		var rus = {
			yes: 'Да',
			no: 'Нет',
			conform: 'Вы уверены, что хотите удалить ',
			delete: 'Удалить',
			price: 'Цена',
			submit: 'Применить',
			newrec: 'Новая запись',
			trans: 'Транзакция',
			app: 'Режим приложения',
			lang: 'Выбор языка',
			action: 'Применить',
			title : 'Управление проектами',
			menu : 'Главное меню',
			config: 'Настройки',
			log : 'Проверка полномочий',
			login : 'Логин',
			pass : 'Пароль',
			enter : 'Вход',
			error : 'Ошибка. Неверное имя или пароль !!!',
			back : 'Назад',
			assets: 'Активы',
			reports: 'Отчеты',
			resources: 'Ресурсы',
			find : 'Поиск',
			outputs : 'Расход',
			inputs : 'Приход',
			projects : 'Проекты',
			departments : 'Подразделения',
			employees : 'Сотрудники',
			users : 'Пользователи',
			audit : 'Аудит',
			logout : 'Выход',
			change : 'Изменить',
			sys : 'Системная информация',
			load : 'Загрузка данных...',
			project_count : 'Количесто проектов: ',
			runs_count : 'Количесто запусков программы: ',
			dep_count : 'Количесто подразделений: ',
			staff_count : 'Количесто сотрудников: ',
			size : 'Размер: ',
			in_count : 'Количесто приходов: ',
			out_count : 'Количесто расходов: ',
			records : 'Количесто записей на странице: ',
			name : 'Наименование',
			sum : 'Сумма',
			add : 'Добавить',
			description : 'Описание',
			grn : 'Гривны',
			grns : ' грн.',
			total : 'Итого'
		};
		$rootScope.rus = rus;

		var eng = {
			yes: 'Yes',
			no: 'No',
			conform: 'Are you sure you want to delete ',
			delete: 'Delete',			
			price: 'Price',
			submit: 'Submit',
			newrec: 'New record',
			trans: 'Transaction',			
			app: 'Application mode',			
			lang: 'Language mode',
			action: 'Action',
			title : 'Project management',
			menu : 'Main menu',
			config: 'Configurations',
			log : 'Login',
			login : 'Login',
			pass : 'Password',
			enter : 'Enter',
			error : 'Error. Wrong name or password !!!',
			back : 'Back',
			assets: 'Assets',
			reports: 'Reports',
			resources: 'Resources',
			find : 'Search',
			outputs : 'Outputs',
			inputs : 'Inputs',
			projects : 'Projects',
			departments : 'Departaments',
			employees : 'Employees',
			users : 'Users',
			audit : 'Audit',
			logout : 'Logout',
			change : 'Change',
			sys : 'System information',
			load : 'Loading...',
			project_count : 'Projects: ',
			runs_count : 'Program runs: ',
			dep_count : 'Departaments: ',
			staff_count : 'Staff: ',
			size : 'Total: ',
			in_count : 'Inputs: ',
			out_count : 'Outputs: ',
			records : 'Records per page: ',
			name : 'Name',
			sum : 'Total',
			add : 'Add',
			description : 'Description',
			grn : 'UAH',
			grns : ' uah.',
			total : 'Total'
		};
		$rootScope.eng = eng;
		
        $rootScope.language = $rootScope.rus; //TODO !!! Russian
        //$rootScope.language = $rootScope.eng; //TODO !!! English
		
		$rootScope.lang = 'Русский'; //TODO !!! Russian
		//$rootScope.lang = 'English'; //TODO !!! English
    }
})();
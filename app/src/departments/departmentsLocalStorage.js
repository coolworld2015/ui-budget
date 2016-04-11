(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProjectsLocalStorage', ProjectsLocalStorage);

    function ProjectsLocalStorage() {
        return {
            projects: [],
            numPerPage: 10,

            getProjects: getProjects,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            setProjects: setProjects,

            uploadProjects: uploadProjects,
            _sort: sort
        };

        function getProjects() {
            if (ProjectsLocalStorage.projects === undefined) {
                var projects = localStorage.getItem('ui-budget.projects');
                projects = JSON.parse(projects);
                ProjectsLocalStorage.projects = projects;
            }

            if (ProjectsLocalStorage.projects === null) {
                ProjectsLocalStorage.projects = [];
            }

            return ProjectsLocalStorage.projects.sort(sort);
        }

        function addItem(item) {
            ProjectsLocalStorage.projects.push(item);
            setProjects();
        }

        function editItem(item) {
            var projects = ProjectsLocalStorage.projects;
            for (var i = 0; i < projects.length; i++) {
                if (projects[i].id == item.id) {
                    projects.splice(i, 1, item);
                    setProjects();
                    break;
                }
            }
        }

        function deleteItem(id) {
            var projects = ProjectsLocalStorage.projects;
            for (var i = 0; i < projects.length; i++) {
                if (projects[i].id == id) {
                    projects.splice(i, 1);
                    setProjects();
                    break;
                }
            }
        }

        function setProjects() {
            localStorage.setItem('ui-budget.projects', JSON.stringify(ProjectsLocalStorage.projects));
        }

        function uploadProjects(projects) {
            localStorage.setItem('ui-budget.projects', JSON.stringify(projects));
            ProjectsLocalStorage.projects = undefined;
        }

        function sort(a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0;
        }
    }
})();

describe('nclFunctionFromScratch Component:', function () {
    var $componentController;
    var $rootScope;
    var $q;
    var ctrl;
    var NuclioProjectsDataService;
    var runtimes;

    beforeEach(function () {
        module('iguazio.app');

        inject(function (_$componentController_, _$rootScope_, _$q_, _NuclioProjectsDataService_) {
            $componentController = _$componentController_;
            $rootScope = _$rootScope_;
            $q = _$q_;
            NuclioProjectsDataService = _NuclioProjectsDataService_;
        });

        runtimes = [
            {
                id: 'golang',
                name: 'Golang',
                sourceCode: 'cGFja2FnZSBtYWluDQoNCmltcG9ydCAoDQogICAgImdpdGh1Yi5jb20vbnVjbGlvL251Y2xpby1zZGstZ28iDQo' +
                'pDQoNCmZ1bmMgSGFuZGxlcihjb250ZXh0ICpudWNsaW8uQ29udGV4dCwgZXZlbnQgbnVjbGlvLkV2ZW50KSAoaW50ZXJmYWNle3' +
                '0sIGVycm9yKSB7DQogICAgcmV0dXJuIG5pbCwgbmlsDQp9',
                visible: true
            },
            {
                id: 'python',
                name: 'Python',
                sourceCode: 'ZGVmIGhhbmRsZXIoY29udGV4dCwgZXZlbnQpOg0KICAgIHBhc3M=',
                visible: true
            },
            {
                id: 'pypy',
                name: 'PyPy',
                sourceCode: 'ZGVmIGhhbmRsZXIoY29udGV4dCwgZXZlbnQpOg0KICAgIHBhc3M=',
                visible: true
            },
            {
                id: 'nodejs',
                sourceCode: 'ZXhwb3J0cy5oYW5kbGVyID0gZnVuY3Rpb24oY29udGV4dCwgZXZlbnQpIHsNCn07',
                name: 'NodeJS',
                visible: true
            },
            {
                id: 'shell',
                name: 'Shell Java',
                sourceCode: '',
                visible: true
            }
        ];

        spyOn(NuclioProjectsDataService, 'getProject').and.callFake(function () {
            return $q.when({metadata: {namespace: 'nuclio'}});
        });

        ctrl = $componentController('nclFunctionFromScratch', null, {toggleSplashScreen: angular.noop});

        ctrl.$onInit();

        $rootScope.$digest();
    });

    afterEach(function () {
        $componentController = null;
        $rootScope = null;
        $q = null;
        ctrl = null;
        NuclioProjectsDataService = null;
        runtimes = null;
    });

    describe('$onInit():', function () {
        it('should fill ctrl.runtimes', function () {
            expect(ctrl.runtimes).toEqual(runtimes);
        });

        it('should initialize ctrl.functionData', function () {
           expect(ctrl.functionData.metadata.name).toEqual('');
           expect(ctrl.functionData.metadata.namespace).toEqual('');
        });
    });

    describe('inputValueCallback():', function () {
        it('should set new data for specified property', function () {
            ctrl.inputValueCallback('new function name', 'name');

            expect(ctrl.functionData.metadata.name).toEqual('new function name');
        });
    });

    describe('onDropdownDataChange():', function () {
        it('should set new runtime to ctrl.functionData.spec.runtime', function () {
            var runtime = {
                id: 'python',
                name: 'Python',
                sourceCode: 'ZGVmIGhhbmRsZXIoY29udGV4dCwgZXZlbnQpOg0KICAgIHBhc3M=', // source code in base64
                visible: true
            };

            ctrl.onDropdownDataChange(runtime, true);

            expect(ctrl.functionData.spec.runtime).toEqual(runtime.id);
            expect(ctrl.functionData.spec.build.functionSourceCode).toEqual(runtime.sourceCode);
        });
    });
});
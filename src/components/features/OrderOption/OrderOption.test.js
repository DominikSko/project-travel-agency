import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name='test' type='test' />);
    expect(component).toBeTruthy();
  });

  // sprawdzimy, czy przy braku podanego typu opcji komponent zachowa się poprawnie, zyli zwróci null.
  // Osiągniemy to, porównując wyrenderowany komponent z pustym obiektem
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render correct title', () => {  // do omówienia, .find traktuj jak querySelector. / .text() jak .innerHTML
    const expectedName = 'name';
    const component = shallow(<OrderOption type='dropdown' name={expectedName} />);
    expect(component.find('.title').text()).toEqual(expectedName);
    //console.log(component.debug);
  });

  const optionTypes = {
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    checkboxes: 'OrderOptionCheckboxes',
    number: 'OrderOptionNumber',
    text: 'OrderOptionText',
    date: 'OrderOptionDate',
  };

  const mockProps = {  // złączyliśmy wszystkie możliwości w jednym obiekcie mockProps, aby ułatwić sobie testowanie
    id: 'abc',
    name: 'Lorem',
    values: [
      {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
      {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
      min: 0,
      max: 6,
    },
  };

  const mockPropsForType = {  // mockPropsForType, zawiera propsy istotne tylko dla konkretnego typu opcji. Na przykład, OrderOptionCheckboxes wymaga, aby currentValue było tablicą, a number – liczbą.
    dropdown: {},
    icons: {},
    checkboxes: {currentValue: [mockProps.currentValue]},
    number: {currentValue: 1},
    text: {},
    date: {},
  };

  // dwie stałe, testValue i testValueNumber – będziemy się starali, aby każdy subkomponent przyjął właśnie tę wartość.
  //Innymi słowy, ta wartość to nasz cel, do którego dążymy. Zwróć uwagę, że testValue odwołuje się do id drugiego obiektu w mockProps.values,
  //podczas gdy mockProps.currentValue jest równe id pierwszego obiektu.
  //W ten sposób zasymulujemy sytuację, w której opcja ma już jakąś wartość, którą chcemy zmienić na inną (lub do której dodamy inną, w przypadku checkboxes).
  const testValue = mockProps.values[1].id;
  //const testValueNumber = 3;

  for (let type in optionTypes){
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */
      // Do przetestowania np. OptionOrderDropdown nie wystarczy nam jednak informacja, że OptionOrder go wykorzystuje. Musimy wyrenderować również ten subkomponent.
      // Chcemy jednak upewnić się, że testujemy tylko ten jeden subkomponent – jeśli OptionOrder zawiera jakiekolwiek inne (np. Col czy Icon), chcemy aby pozostały jako kod JSX.
      // Dlatego nie użyjemy mount (o którym wspominaliśmy wcześniej) zamiast shallow – lepiej będzie skorzystać z metody .dive!
      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption; /* 1 */

      beforeEach(() => {  // Funkcja beforeEach wykona się przed uruchomieniem każdego z testów it – oznacza to, że każdy test będzie miał do dyspozycji świeżo wyrenderowany komponent OrderOption, i nie musimy używać funkcji shallow w każdym z testów!
        mockSetOrderOption = jest.fn(); /* 2 jest.fn() to właśnie sposób na stworzenie atrapy funkcji!  w bibliotece jest, Jest posiada wbudowany mechanizm do mockowania funkcji, czyli budowania atrapy, która pozwoli nam sprawdzić, czy ta funkcja była wykonana, ile razy, z jakimi argumentami, etc.*/
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption} /* 3 */
            {...mockProps}  // Teraz musimy wykorzystać te atrapy propsów w funkcji beforeEach
            {...mockPropsForType[type]}
          />
        );
        subcomponent = component.find(optionTypes[type]);  // w wyrenderowanym komponencie OrderOption znaleźć subkomponent za pomocą metody .find   , jako selektor nazwa komponentu
        renderedSubcomponent = subcomponent.dive();  // testy zaczną sypać błędami – wręcz możesz się z tego ucieszyć! Dzieje się tak, ponieważ metoda .dive wyrenderowała subkomponenty, i to one zgłaszają błędy, ponieważ nie otrzymały propsów wymaganych do poprawnego działania.
      });

      /* common tests */
      /* przykładowy dummy test
      it('passes dummy test', () => {
        expect(1).toBe(1);
        console.log(component.debug());
        console.log(subcomponent.debug());
      }); */
      it(`renders ${optionTypes[type]}`, () => {
        expect(subcomponent).toBeTruthy;
        expect(subcomponent.length).toBe(1);
      });

      /* test specific-tests */
      switch (type) {
        case 'dropdown': {
          it('contains select and options', () => { // do omówienia , dla dropdownów test
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);

            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);

            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });
          // drugi z nich zajmie się sprawdzeniem interaktywności tego subkomponentu
          it('should run setOrderOption function on change', () => {         // do omówienia
            renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}}); // Po znalezieniu selecta, wykonujemy na nim metodę .simulate, która przyjmuje jeden lub dwa argumenty. Pierwszym z nich jest rodzaj eventu, jaki ma zostać zasymulowany – w tym wypadku event change
            expect(mockSetOrderOption).toBeCalledTimes(1);  //  sprawdzamy, czy ta funkcja została wykonana dokładnie jeden raz.
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue }); // sprawdzamy, czy została wywołana z poprawnymi argumentami.
          });
          break;
        }
      }
    });
  }
});

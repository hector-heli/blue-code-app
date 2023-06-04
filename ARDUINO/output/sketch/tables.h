#line 1 "D:\\app-prototype\\blue-code-app\\ARDUINO\\MEGA-ESP32-MONGO\\tables.h"
// ESTADOS DEL SISTEMA
#define ok 10
#define alertaCama 11
#define alertaBano 14
#define codigoAzul 13
#define sinReporte 14

char ardMegaData[100] = { ' ',
                      'A', 'B', 'C', //hab1
                      'D', 'E', 'F', //hab2
                      'G', 'H', 'I', //hab3
                      'J', 'K', 'L', //hab4
                      'M', 'N', 'O', //hab5
                      'P', 'Q', 'R', //hab6
                      'S', 'T', 'U', //hab7
                      'V', 'W', 'X', //hab8
                      'Y', 'Z', 'a', //hab9
                      'b', 'c', 'd', //hab10
                      'e', 'f', 'g', //hab11
                      'h', 'i', 'j', //hab12
                      'k', 'l', 'm', //hab13
                      'n', 'o', 'p', //hab14
                      'q', 'r', 's', //hab15
                      't', 'u', 'v', //reserva
                      'w', 'x', 'y', // reserva
                      'z', '1', '2', // baño
                      '3', '4', '5', // baño
                      '6', '7', '8', // baño
                      '9', '0' }; // baño

char* alarmCode[100][2] = {{},{"Hab1", "green"}, {"Hab1", "blue"}, {"Hab1", "cancel"},
                              {"Hab2", "green"}, {"Hab2", "blue"}, {"Hab2", "cancel"},
                              {"Hab3", "green"}, {"Hab3", "blue"}, {"Hab3", "cancel"},
                              {"Hab4", "green"}, {"Hab4", "blue"}, {"Hab4", "cancel"},
                              {"Hab5", "green"}, {"Hab5", "blue"}, {"Hab5", "cancel"},
                              {"Hab6", "green"}, {"Hab6", "blue"}, {"Hab6", "cancel"},
                              {"Hab7", "green"}, {"Hab7", "blue"}, {"Hab7", "cancel"},
                              {"Hab8", "green"}, {"Hab8", "blue"}, {"Hab8", "cancel"},
                              {"Hab9", "green"}, {"Hab9", "blue"}, {"Hab9", "cancel"},
                              {"Hab10", "green"}, {"Hab10", "blue"}, {"Hab10", "cancel"},
                              {"Hab11", "green"}, {"Hab11", "blue"}, {"Hab11", "cancel"},
                              {"Hab12", "green"}, {"Hab12", "blue"}, {"Hab12", "cancel"},
                              {"Hab13", "green"}, {"Hab13", "blue"}, {"Hab13", "cancel"},
                              {"Hab14", "green"}, {"Hab14", "blue"}, {"Hab14", "cancel"},
                              {"Hab15", "green"}, {"Hab15", "blue"}, {"Hab15", "cancel"},
                              {"Hab16", "green"}, {"Hab16", "blue"}, {"Hab16", "cancel"},
                              {"Hab17", "green"}, {"Hab17", "blue"}, {"Hab17", "cancel"},

                              {"Bath1", "red"}, {"Barh2", "red"}, {"Barh3", "red"},
                              {"Bath3", "red"}, {"Barh4", "red"}, {"Barh5", "red"},
                              {"Bath6", "red"}, {"Barh7", "red"}, {"Barh8", "red"},
                            };

  


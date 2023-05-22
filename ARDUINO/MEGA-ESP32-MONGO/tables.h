// ESTADOS DEL SISTEMA
#define ok 10
#define alertaCama 11
#define alertaBano 14
#define codigoAzul 13
#define sinReporte 14

char ardMegaData[100] = { ' ',
                      'A', 'B', 'C', 'D', //hab1
                      'E', 'F', 'G', 'H', //hab2
                      'I', 'J', 'K', 'L', //hab3
                      'M', 'N', 'O', 'P', //hab4
                      'Q', 'R', 'S', 'T', //hab5
                      'U', 'V', 'W', 'X', //hab6
                      'Y', 'Z', 'a', 'b', //hab7
                      'c', 'd', 'e', 'f', //hab8
                      'g', 'h', 'i', 'j', //hab9
                      'k', 'l', 'm', 'n', //hab10
                      'o', 'p', 'q', 'r', //hab11
                      's', 't', 'u', 'v', //hab12
                      'w', 'x', 'y', 'z' //hab13
                      };

char* alarmCode[100][2] = {{},{"Hab1", "blue"}, {"Hab1", "green"}, {"Hab1", "bath"}, {"Hab1", "cancel"},
                              {"Hab2", "blue"}, {"Hab2", "green"}, {"Hab2", "bath"}, {"Hab2", "cancel"},
                              {"Hab3", "blue"}, {"Hab3", "green"}, {"Hab3", "bath"}, {"Hab3", "cancel"},
                              {"Hab4", "blue"}, {"Hab4", "green"}, {"Hab4", "bath"}, {"Hab4", "cancel"},
                              {"Hab5", "blue"}, {"Hab5", "green"}, {"Hab5", "bath"}, {"Hab5", "cancel"},
                              {"Hab6", "blue"}, {"Hab6", "green"}, {"Hab6", "bath"}, {"Hab6", "cancel"},
                              {"Hab7", "blue"}, {"Hab7", "green"}, {"Hab7", "bath"}, {"Hab7", "cancel"},
                              {"Hab8", "blue"}, {"Hab8", "green"}, {"Hab8", "bath"}, {"Hab8", "cancel"},
                              {"Hab9", "blue"}, {"Hab9", "green"}, {"Hab9", "bath"}, {"Hab9", "cancel"},
                              {"Hab10", "blue"}, {"Hab10", "green"}, {"Hab10", "bath"}, {"Hab10", "cancel"},
                              {"Hab11", "blue"}, {"Hab11", "green"}, {"Hab11", "bath"}, {"Hab11", "cancel"},
                              {"Hab12", "blue"}, {"Hab12", "green"}, {"Hab12", "bath"}, {"Hab12", "cancel"},
                              {"Hab13", "blue"}, {"Hab13", "green"}, {"Hab13", "bath"}, {"Hab13", "cancel"},
                              {"Hab14", "blue"}, {"Hab14", "green"}, {"Hab14", "bath"}, {"Hab14", "cancel"},
                              {"Hab15", "blue"}, {"Hab15", "green"}, {"Hab15", "bath"}, {"Hab15", "cancel"},
                              {"Hab16", "blue"}, {"Hab16", "green"}, {"Hab16", "bath"}, {"Hab16", "cancel"},
                              {"Hab17", "blue"}, {"Hab17", "green"}, {"Hab17", "bath"}, {"Hab17", "cancel"},
                              {"Hab18", "blue"}, {"Hab18", "green"}, {"Hab18", "bath"}, {"Hab18", "cancel"}
                            };

  


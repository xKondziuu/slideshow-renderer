# Prezentacja zdjęć javascript 
#### z ładowaniem obrazków z folderu
***
#
### [Przykład użycia](http://storage.axel-sklep.com.pl/robotyka/robotyka-karuzela/example.html "example.html")
#
##### Instalacja:
Aby zainstalować skrypt na swojej stronie, należy zaimplementować ``jquery-3.6.0.min.js`` do naszej strony, a następnie na samym końcu elementu ``body`` należy dodać zaledwie jeden skrypt ``slideshow.js``:
```html
<html>
    <head>
        . . .
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    </head>
    <body>
        . . .
        <script src="slideshow.js"></script>
    </body>
</html>
```
#
##### Element slideshow-renderer:
Niestety jak narazie można dodać tylko jedną prezentację na stronę (jedną na jeden dokument ``html``).
Prezentacje dodajemy do strony używając nowego elementu ``html`` dodanego przez skrypt, mianowicie ``<slideshow-renderer>``:
```html
<slideshow-renderer directory="zdjęcia" amount="4" first="1" loop style="width: 800px; height: 450px;"></slideshow-renderer>
```
Argumenty ``directory``, ``amount`` i ``first`` są obowiązkowe. Obowiązkowe jest również zdefiniowanie szerokości i wysokości elementu dokładnie tak somo jak wyżej, czyli za pomocą elementu ``style``. Inaczej element nie będzie się wyświetlać. Argument ``loop`` nie jest obowiązkowy.
#
Za pomocą ``directory`` określamy folder ze zdjęciami, np. ``directory="moje/zdjęcia"`` oznacza, że zdjęcia będą ładowane z folderu ``./moje/zdjęcia/``.

Argument ``amount`` określa ilość ładowanych zdjęć, np. ``amount="10"`` zawsze załaduje 10 zdjęć, nawet jeśli w folderze znajduję się ich więcej.
**Uwaga:** Wartość ``amount`` nigdy nie może być mniejsza niż ilość zdjęć w foderze. Będzie to powodować dużo błędów.

Wartość ``first`` określa pierwsze zdjęcie jakie zostaje pokazane po załadowaniu strony.
**Uwaga:** Wartość ``first`` nigdy nie może być mniejsza od 1, ani większa od wartości ``amount``.

Dodatkowy argument ``loop`` włącza zapętlanie, oznacza to, że jeśli dojdziemy do ostatniego zdjęcia i klikniemy dalej to zostaniemy przeniesieni do pierwszego. Adekwatnie gdy podczas wyświetlania pierwszego zdjęcia klikniemy strzałkę do tyłu to zostaniemy przeniesieni do ostatniego zdjęcia. Bez argumentu ``loop`` w obydwu przypadkach nic się nie stanie.
#
##### Folder ze zdjęciami:
Folder w którym umieścimy zdjęcia może mieć dowolną nazwę. Zaleca się ładować zdjęcia z tego serwera, gdyż w przypadku większości przeglądarek załadowanie zdjęć z innego serwera może być problematyczne lub niemożliwe.

Zdjęcia w folderze muszą być kolejno nazwane numerycznie i mogą mieć następujące rozszerzenia ``.jpg``, ``.jpeg``, ``.jpe``, ``.png``, ``.webp``, ``.bmp``, ``.tif``, ``.tiff``, ``.gif.``. Na przykład:
```
1.jpg
2.jpg
3.png
4.png
5.tiff
6.jpeg
7.gif
8.bmp
9.jpg
10.tif
11.png
12.jpeg
```
#
##### Dodatkowo:
Zaleca się umieszczenie elementu ``<slideshow-renderer>`` w elemencie ``<div>``, gdyż ułatwia to między innymi jego skalowanie i poprawia kompatybilność z urządzeniami mobilnymi oraz o mniejszym ekranie:
```html
<div class="my-div">
    <slideshow-renderer directory="zdjęcia" amount="20" first="1" style="width: 800px; height: 450px;"></slideshow-renderer>
</div>
```
######
Dla poprawnego skalowania elementu na urządzeniach mobilnych i z mniejszym ekranem w ``<head>`` należy umieścić:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

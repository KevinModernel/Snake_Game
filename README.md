# Snake_Game
SPA Snake Game - Javascript

Juego basado en el video https://www.youtube.com/watch?v=J42SZXS-_Qo&ab_channel=ServetGulnaroglu , donde se programa un Snake Game en JS y HTML.

Luego de estudiar la teoría elemental de Javascript, HTML y CSS, este fue mi primer proyecto. Pude poner en práctica muchos de los conceptos que había estudiado, y aprender varias cosas nuevas.

En el desarrollo del juego, aprendí a cómo se debe pensar una aplicación, separandola en primer momento en sus partes elementales, y luego combinandolas haciendo que interactuen entre ellas. En este caso, las partes elementales serían la serpiente, la manzana, y el área de juego.

###### Snake:

Creamos la clase Snake, y utilizando el método ```constructor``` definimos las propiedades que deberán ser pasadas al crear un nuevo objeto.

También definimos un método para realizar el movimiento de la serpiente. ¿Cómo funciona su movimiento? Basicamente la serpiente estará constituida por rectangulos, donde cada uno tendrá asignadas ciertas coordenadas X e Y. Cada vez que la serpiente avanza lo podemos pensar como que la cabeza avanza una posición, y la cola se borra (último rectángulo), y el resto del cuerpo permanece en la misma posición, así para cada recuadro (o Frame). Entonces, almacenando la serpiente como ```this.tail = [{x:this.x, y:this.y}]``` y usando los Built-in métodos ```.shift()``` y ```.push()``` podemos llevar a cabo el comportamiento deseado.

```

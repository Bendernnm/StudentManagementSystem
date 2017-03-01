define(['d3'],
    function (d3) {
        return function (element, data) {
            d3.select(element)
                .selectAll('div .line')
                .data(data)
                .enter()
                .append('div')
                .attr('class', 'line');

            d3.select(element)
                .selectAll('div .line')
                .append('div')
                .attr('class', 'label')
                .text(function (d) {
                    return d.get('name');
                });

            d3.select(element)
                .selectAll('div .line')
                .append('div')
                .attr('class', 'bar')
                .style('width', function (d) {
                    return d.get('avg') * 5 + 'px';
                })
                .text(function (d) {
                    return Math.round(d.get('avg'));
                });
        }
    });
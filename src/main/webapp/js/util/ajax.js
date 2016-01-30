/*
 * Copyright (C) July 2014 Rafael Aznar
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */



var ajax = function() {

    return {
        ajaxCallSync: function(url, type, data) {
            return $.ajax({
                type: type,
                url: url,
                data: data,
                dataType: "json",
                async: false,
                timeout: 30000
            });
        },
        ajaxCallASync: function(url, type, data, callBackFunction) {
            return $.ajax({
                type: type,
                url: url,
                data: data,
                async: true,
                dataType: "json",
                timeout: 30000,
                success: callBackFunction
            });
        },
        procesaAjax: function(direccion, funcion) {
            $.ajax({
                url: direccion,
                //data: "nocache=" + Math.random(),
                type: "GET",
                dataType: "json",
                beforeSend: function() {
                },
                success: function(source) {
                    $("#data").empty();
                    funcion(source);
                },
                error: function(dato) {
                    $("#data").empty();
                    $("#data").append("ERROR en la recepción de datos de clientes");
                }
            });
        }

    }
}
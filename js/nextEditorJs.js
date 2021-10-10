"use strict";
/**
* Name: NextJs
* Desc: A Simple and Lightweight JavScript Framework.
* version: 1.0.0
* Package: @NextJs
* Author: ThemeDev
* Developer: Hazi
*/
var $nJsEditorCont = {
    init: function(){

    },
    createDropDown : function( $el, $k, $key, $v ){
        var $heading = document.createElement('div');
        $heading.setAttribute('class', 'njs-editor-control njs-editor-' + $key);
        $heading.setAttribute('title', ($v.title) ?? '' );

        var $button = document.createElement('button');
        $button.setAttribute('class', 'njs-button njs-button-dropdown njs-button-'+$key+' fa fa-angle-down');
        $button.setAttribute('type', 'button');
        
        var $icon = ($v.icon) ?? '';
        var $html = ($v.html) ?? '';
        if( $icon != ''){
            var $iconEl = document.createElement('i');
            $iconEl.setAttribute('class', $icon);
            $button.appendChild($iconEl);
        } else if( $html != ''){
            $button.setAttribute('njs-default', $html);
            $button.innerHTML = $html;
        }
        $heading.appendChild($button);

        var $dropdown = document.createElement('div');
        $dropdown.setAttribute('class', 'njs-popup njs-popup-dropdown njs-button-'+$key);
        var $ul = document.createElement('ul');
        $ul.setAttribute('class', 'njs-list');

        var $typeEl = ($v.type) ?? 'button';
        var $data = ($v.data) ?? false;
        var $act = ($v.action) ?? false;
        var $attr = ($v.attr) ?? { type: 'button'};

        if( typeof $data === 'object' && $data !== null ){
            for (const [$kat, $vat] of Object.entries($data)) {
                var $li = document.createElement('li');

                $typeEl = ($vat.type) ?? $typeEl;
                var $buttonEl = document.createElement($typeEl);
                var $title;
                
                if( typeof $vat === 'object' && $vat !== null ){
                    $attr = ($vat.attr) ?? $attr;
                    $act = ($vat.action) ?? $act;
                    $title = ($vat.title) ?? '';
                    $key = $kat;
                    var $iconB = ($vat.icon) ?? '';
                    var $htmlV = ($vat.html) ?? '';
                    if( $iconB != ''){
                        $attr.class += ' ' + $iconB;
                    } else{
                        $buttonEl.innerHTML = $htmlV;
                    }
                    if( $key == 'extlink' || $key == 'uploadfile') {
                        $buttonEl.innerHTML += $title;
                        $attr.class += ' njs-no-pointer';
                    } 
                } else {
                    $title = $vat;
                    $buttonEl.setAttribute('njs-value', $kat);
                    if( $key == 'heading' ){
                        $buttonEl.innerHTML = '<' + $kat + '>' + $vat + '</' + $kat + '>';
                        $attr.class += ' njs-no-pointer';
                    } else if( $key == 'fontfamily' ) {
                        $buttonEl.innerHTML = '<span style="font-family:'+$vat+';">' + $vat + '</span>';
                        $buttonEl.setAttribute('njs-value', $vat);
                        $attr.class += ' njs-no-pointer';
                    }else if( $key == 'fontcolor' || $key == 'highlight') {
                        $buttonEl.style.backgroundColor = $kat;
                        $attr.class += ' njs-no-pointer';
                    } else if( $key == 'fontsize' ) {
                        $buttonEl.innerHTML = $vat;
                        $attr.class += ' njs-no-pointer';
                    } else {
                        $buttonEl.innerHTML = $vat;
                    }
                    
                }

                if( typeof $attr === 'object' && $attr !== null ){
                    for (const [$atk, $atv] of Object.entries($attr)) {
                        $buttonEl.setAttribute($atk, $atv );
                    }
                }
                if( typeof $act === 'object' && $act !== null ){
                    for (const [$ka, $va] of Object.entries($act)) {
                        if( $ka == ''){
                            continue;
                        }
                        
                        var fn = $va;
                        if( typeof fn === "function"){
                            $buttonEl.addEventListener($ka, fn);
                        }
                    }
                }

                $buttonEl.classList.add('njs-button');
                $buttonEl.setAttribute('title', $title);
                $buttonEl.setAttribute('id', 'njs-'+$k + '-' + $key );
                $buttonEl.setAttribute('njs-control-id', $k );
                $buttonEl.setAttribute('njs-keys', $key );

                $li.appendChild($buttonEl);

                $ul.appendChild($li);
            }
        }

        $dropdown.appendChild($ul);

        $heading.appendChild($dropdown);
        
        $el.appendChild($heading);

        $button.addEventListener('click', function( $e ){
            $e.preventDefault();
            var $this = this;

            var $find = $this.parentElement.querySelector('.njs-popup');
            $el.querySelectorAll('.njs-popup').forEach( $v => {
                if( $v != $find){
                    $v.classList.remove('njs-open');
                }
            });
            $find.classList.toggle('njs-open');
        });
        return $ul;
    },
    createButton: function(  $el, $k, $key, $v){
        if( !$el ){
            return;
        }
        var $typeEl = ($v.type) ?? 'button';
        var $action = document.createElement($typeEl);
        $action.setAttribute('title', ($v.title) ?? '' );
        $action.setAttribute('id', 'njs-'+$key + '-' + $k );
        $action.setAttribute('njs-control-id', $k );
        $action.setAttribute('njs-keys', $key );
        
        var $act = ($v.action) ?? false;
        var $icon = ($v.icon) ?? '';
        var $html = ($v.html) ?? '';
        if( $icon != ''){
            $action.setAttribute('class', $icon);
        } else if( $html != ''){
            $action.innerHTML = $html;
        }

        $action.classList.add('njs-button');
        $action.classList.add('njs-' + $key);

        
        if( typeof $act === 'object' && $act !== null ){
            for (const [$ka, $va] of Object.entries($act)) {
                if( $ka == ''){
                    continue;
                }
                
                var fn = $va;
                if( typeof fn === "function"){
                    $action.addEventListener($ka, fn);
                }
            }
        }

        var $attr = ($v.attr) ?? { type: 'button'};
        if( typeof $attr === 'object' && $attr !== null ){
            for (const [$kat, $vat] of Object.entries($attr)) {
                $action.setAttribute($kat, $vat );
            }
        }
        
        $el.appendChild($action);
        return $action;
    },
    renTitle: function( $el, $k, $type){

        if( !$el ){
            return;
        }

        var $items = $nJsEditorCont.getType( $type );
        if($items){

            if( Object.entries($items) ){
                for (const [$k1, $v] of Object.entries($items)) {

                    var $data = ($v.data) ?? false;
                    if( $data ){
                        $nJsEditorCont.createDropDown($el, $k, $k1, $v);
                    } else {
                        $nJsEditorCont.createButton($el, $k, $k1, $v);
                    }
                    
                }
                if($type != 'rollback'){
                    var $seperator = document.createElement('span');
                    $seperator.classList.add('njs-toolbar__separator');
    
                    $el.appendChild($seperator);
                }
                
            }
            
        }
    },
    getType: function( t ){
       
        var $types = {
            'title' : {
                'heading' : {'attr' : { class: 'njs-heading'}, 'title' : 'Heading', 'icon' : 'fa fa-header', 'html' : 'Select once', 
                    'action' : {'click' : $nJsEditor.headingAction },
                    'data' : $nJsEditor.getFormatFont()
                },
                'fontfamily' : {'attr' : { class: 'njs-fontfamily'}, 'title' : 'Font Family', 'icon' : 'fa fa-font', 'html' : 'Select once', 
                    'action' : {'click' : $nJsEditor.fontfamilyAction },
                    'data' : $nJsEditor.getFontFamily()
                },
                'fontsize' : {'attr' : { class: 'njs-fontsize'}, 'title' : 'Font Size', 'icon' : 'fa fa-text-height', 'html' : 'Select once', 
                    'action' : {'click' : $nJsEditor.increaseAction },
                    'data' : $nJsEditor.getFontSize()
                },
                'fontcolor' : {'attr' : { class: 'njs-fontcolor'}, 'title' : 'Font Color', 'icon' : 'fa fa-text-width', 'html' : 'Select once', 
                    'action' : {'click' : $nJsEditor.fontcolorAction },
                    'data' : $nJsEditor.getFontColor()
                },
                'highlight' : {'attr' : { class: 'njs-fontcolor'}, 'title' : 'Highlight Color', 'icon' : 'fa fa-font', 'html' : 'Select once', 
                    'action' : {'click' : $nJsEditor.highlightAction },
                    'data' : $nJsEditor.getFontColor()
                },
                
            },
            'normal' : {
                'paragraph' : {'title' : 'Paragraph', 'icon' : 'fa fa-paragraph', 'html' : 'br', 'action' : {'click' : $nJsEditor.paragraphAction }},
                'bold' : {'title' : 'Bold', 'icon' : 'fa fa-bold', 'html' : '', 'action' : {'click' : $nJsEditor.boldAction }},
                'italic' : {'title' : 'Italic', 'icon' : 'fa fa-italic', 'html' : '', 'action' : {'click' : $nJsEditor.italicAction }},
                'underline' : {'title' : 'Underline', 'icon' : 'fa fa-underline', 'html' : '', 'action' : {'click' : $nJsEditor.underlineAction }},
                'strike' : {'title' : 'Strike', 'icon' : 'fa fa-strikethrough', 'html' : '', 'action' : {'click' : $nJsEditor.strikeAction }},
            },
            'link' : {
                'link' : {'title' : 'Inset / Edit Link', 'icon' : 'fa fa-link', 'html' : '', 'action' : {'click' : $nJsEditor.linkAction }},
                'unlink' : {'title' : 'Remove Link', 'icon' : 'fa fa-unlink', 'html' : '', 'action' : {'click' : $nJsEditor.unlinkAction }},
                'upload' : {'attr' : { class: 'njs-files'}, 'title' : 'Upload Files', 'icon' : 'fa fa-image', 'html' : '', 
                    'data' : {
                        'extlink' : {'title' : 'External Link', 'icon' : 'fa fa-chain', 'html' : '', 'action' : {'click' : $nJsEditor.extlinkAction }},
                        'uploadfile' : {'title' : 'Upload files', 'icon' : 'fa fa-file-image-o', 'html' : '', 'action' : {'click' : $nJsEditor.uploadfileAction }},
                    }
                },
            },
            'align' : {
                'alignment' : {'attr' : { class: 'njs-align'}, 'title' : 'Align', 'icon' : 'fa fa-align-left', 'html' : '', 
                    'data' : {
                        'left' : {'title' : 'Left Align', 'icon' : 'fa fa-align-left', 'html' : '', 'action' : {'click' : $nJsEditor.leftAction }},
                        'center' : {'title' : 'Center Align', 'icon' : 'fa fa-align-center', 'html' : '', 'action' : {'click' : $nJsEditor.centerAction }},
                        'right' : {'title' : 'Right Align', 'icon' : 'fa fa-align-right', 'html' : '', 'action' : {'click' : $nJsEditor.rightAction }},
                        'justify' : {'title' : 'Justify Align', 'icon' : 'fa fa-align-justify', 'html' : '', 'action' : {'click' : $nJsEditor.justifyAction }},
                    }
                },
                
            },
            'order' : {
                'ordered' : {'title' : 'Number List', 'icon' : 'fa fa-list-ol', 'html' : '', 'action' : {'click' : $nJsEditor.orderedAction }},
                'unordered' : {'title' : 'Bulleted List', 'icon' : 'fa fa-list-ul', 'html' : '', 'action' : {'click' : $nJsEditor.unorderedAction }},
            },

            'copy_cut' : {
                'copy' : {'title' : 'Copy', 'icon' : 'fa fa-copy', 'html' : '', 'action' : {'click' : $nJsEditor.copyAction }},
                'cut' : {'title' : 'Cut', 'icon' : 'fa fa-cut', 'html' : '', 'action' : {'click' : $nJsEditor.cutAction }},
                'paste' : {'title' : 'Paste', 'icon' : 'fa fa-paste', 'html' : '', 'action' : {'click' : $nJsEditor.pasteAction }},
                'delete' : {'title' : 'Delete', 'icon' : 'fa fa-trash-o', 'html' : '', 'action' : {'click' : $nJsEditor.deleteAction }},
            },
            
            'math' : {
                'sup' : {'title' : 'Sup', 'icon' : 'fa fa-superscript', 'html' : '', 'action' : {'click' : $nJsEditor.supAction }},
                'sub' : {'title' : 'Sub', 'icon' : 'fa fa-subscript', 'html' : '', 'action' : {'click' : $nJsEditor.subAction }},
            },
            'rollback' : {
                'undo' : {'title' : 'Undo', 'icon' : 'fa fa-undo', 'html' : '', 'action' : {'click' : $nJsEditor.undoAction }},
                'redo' : {'title' : 'Redo', 'icon' : 'fa fa-repeat', 'html' : '', 'action' : {'click' : $nJsEditor.redoAction }},
            },
            

        };
        return ($types[t]) ?? false;
    },
    setClickPopupData: function( $el ){
        if( !$el){
            return;
        }
        $el.querySelectorAll('.njs-popup').forEach( $v => {
            $v.classList.remove('njs-open');
        });
    }
};

var $nJsEditor = {

    init: function(  $selector, $settings = '', $control = ''){
        let $tabs = document.querySelectorAll($selector);
        if( $tabs ){
            $tabs.forEach(function($v, $k){
                $v.setAttribute('style', 'display: none;');
                $v.setAttribute('njs-editor', 'njseditor-'+ $k);
                $v.classList.add('njseditor-'+ $k);

                if( $settings != ''){
                    $v.setAttribute('njs-settings', JSON.stringify($settings)); 
                }
                // set Settings
                let $sett = $nJsEditor.getSettings( $v );
                var $type = ($sett.type) ? $sett.type : 'basic';
                if( $control != ''){
                    $v.setAttribute('njs-' + $type, JSON.stringify($control)); 
                }
              
                // parent
                var $parentEl = $v.parentElement;
                var $appendEl = $parentEl.querySelector('.njseditor-'+ $k);

                var $mode = ($sett.displayMode) ? $sett.displayMode : 'white';
                var $panelClass = ($sett.panelClass) ? $sett.panelClass : 'njs-editor-panel';
                var $new = document.createElement('div');
                $new.classList.add($panelClass);
                $new.classList.add('njseditor-panel-'+ $k);
                $new.classList.add('njseditor-mode-'+ $mode);
                $new.setAttribute('njs-panel', 'njseditor-'+ $k);
                
                var $controls = document.createElement('div');
                $controls.classList.add('njseditor-panel-controls');

                // render control
                $nJsEditorCont.renTitle($controls, $k, 'title');
                
                $nJsEditorCont.renTitle($controls, $k, 'normal');
                $nJsEditorCont.renTitle($controls, $k, 'align');
                $nJsEditorCont.renTitle($controls, $k, 'order');
                $nJsEditorCont.renTitle($controls, $k, 'link');
                $nJsEditorCont.renTitle($controls, $k, 'copy_cut');
                $nJsEditorCont.renTitle($controls, $k, 'math');
                $nJsEditorCont.renTitle($controls, $k, 'rollback');

                $new.appendChild($controls);
                
                var $editorPanel = document.createElement('div');
                $editorPanel.classList.add('njseditor-panel-editor');

                var $editorMode = document.createElement('iframe');
                $editorMode.classList.add('njseditor-iframe-editor');
                $editorMode.setAttribute('id', 'njseditor-mode-' + $k);
                $editorMode.setAttribute('name', 'njseditor-mode-' + $k);
                $editorMode.setAttribute('frameborder', 0);
                
                $editorMode.setAttribute('style', 'height: 100%; width: 100%; position: relative;');
                $editorPanel.appendChild($editorMode);

                window.addEventListener("load", function( $e ){
                    $e.preventDefault();
                    var $editor = window.frames['njseditor-mode-' + $k].document;
                    if( $editor){
                        $editor.body.innerHTML = $v.value;
                        $editor.designMode = "on";
                        $editor.body.setAttribute('njs-control-id', $k);
                        $editor.addEventListener('keyup', $nJsEditor.editorKeyup);
                    }
                    
                });

                $new.appendChild($editorPanel);
                
                $parentEl.insertBefore($new, $appendEl);

            });

           
        }
    },
    getFontFamily: function(){
        return ["Times New Roman", "Consolas", "Tahoma", "Monospace", "Cursive", "Sans-Serif", "Calibri", "Arial"];
    },

    getFontSize: function(){
        return {
            '1' : 'Tiny',
            '2' : 'Small',
            '3' : 'Default',
            '4' : 'Medium',
            '5' : 'Large',
            '6' : 'Big',
            '7' : 'Huge',
        };
    },

    getFontColor: function(){
        return {
            'rgb(0, 0, 0)' : 'Black',
            'rgb(77, 77, 77)' : 'Dim grey',
            'rgb(153, 153, 153)' : 'Grey',
            'rgb(230, 230, 230)' : 'Light grey',
            'rgb(255, 255, 255)' : 'White',
            'rgb(230, 76, 76)' : 'Red',
            'rgb(230, 153, 76)' : 'Orange',
            'rgb(230, 230, 76)' : 'Yellow',
            'rgb(153, 230, 76)' : 'Light green',
            'rgb(76, 230, 76)' : 'Green',
            'rgb(76, 230, 153)' : 'Aquamarine',
            'rgb(76, 230, 230)' : 'Turquoise',
            'rgb(76, 153, 230)' : 'Light blue',
            'rgb(76, 76, 230)' : 'Blue',
            'rgb(153, 76, 230)' : 'Purple',
        };
    },

    getFormatFont: function(){
        return {
            'p' : 'Paragraph',
            'h1' : 'Heading 1',
            'h2' : 'Heading 2',
            'h3' : 'Heading 3',
            'h4' : 'Heading 4',
            'h5' : 'Heading 5',
            'h6' : 'Heading 6',
            'blockquote' : 'Blockquote',
        };
    },
   
    getSettings: function( $el ){
        let $default = {
            type: 'basic', // css, class
            panelClass : 'njs-editor-panel',
            displayMode: 'white', //// dark, white
        };

        let $settings = $el.getAttribute('njs-settings');
        if( !$settings ){
            $el.setAttribute('njs-settings', JSON.stringify($default));
            return $default;
        } 

        $settings = JSON.parse($settings);
        let $neSettings = {};
        $neSettings.type = ($settings.type) ? $settings.type : $default.type;
        $neSettings.panelClass = ($settings.panelClass) ? $settings.panelClass : $default.panelClass;
        $neSettings.displayMode = ($settings.displayMode) ? $settings.displayMode : $default.displayMode;
        
        return $neSettings;
    },
    setValue: function($k, $editor ){
        var $el = document.querySelector('.njseditor-'+$k+'[njs-editor="njseditor-'+$k+'"]');
        if( $el ){
            $el.innerHTML =  $editor.body.innerHTML;
        }
        $nJsEditorCont.setClickPopupData( document.querySelector('.njseditor-panel-' + $k) );
    },
    getValue: function($el, $name ){
        if( $el ){
            window.frames[$name].document.body.innerHTML = $el.value;
        }
    },
    editorKeyup: function( $e){
        $e.preventDefault();
        var $this = this;
        var $k = $this.body.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $nJsEditor.setValue($k, $editor );
        }
    },
    paragraphAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("insertParagraph", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    boldAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("Bold", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    italicAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("Italic", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    linkAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            
            var url = prompt("Enter a URL", "http://");
		    $editor.execCommand("CreateLink", false, url);
            $nJsEditor.setValue($k, $editor );
        }
    },
    unlinkAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("Unlink", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    underlineAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("Underline", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    supAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("Superscript", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    subAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("Subscript", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    strikeAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("Strikethrough", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    leftAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("JustifyLeft", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    centerAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("JustifyCenter", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    rightAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("JustifyRight", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    justifyAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("justifyFull", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    orderedAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("InsertOrderedList", false, "newOL", + Math.round(Math.random() * 1000));
            $nJsEditor.setValue($k, $editor );
        }
    },
    unorderedAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("InsertUnorderedList", false, "newOL", + Math.round(Math.random() * 1000));
            $nJsEditor.setValue($k, $editor );
        }
    },
    fontcolorAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("ForeColor", false, $e.target.getAttribute('njs-value'));
            $nJsEditor.setValue($k, $editor );
        }
    },
    highlightAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("BackColor", false, $e.target.getAttribute('njs-value'));
            $nJsEditor.setValue($k, $editor );
        }
    },
    fontfamilyAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("FontName", false, $e.target.getAttribute('njs-value'));
            $nJsEditor.setValue($k, $editor );
        }
    },
    headingAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("formatblock", false, $e.target.getAttribute('njs-value'));
            $nJsEditor.setValue($k, $editor );
        }
    },
    increaseAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("styleWithCSS", true, null);
            $editor.execCommand("fontSize", false, $e.target.getAttribute('njs-value'));
            $nJsEditor.setValue($k, $editor );
        }
    },
    undoAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("undo", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    redoAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("redo", false, null);
            $nJsEditor.setValue($k, $editor );
        }
    },
    copyAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("copy");
            $nJsEditor.setValue($k, $editor );
        }
    },
    cutAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("cut");
            $nJsEditor.setValue($k, $editor );
        }
    },
    pasteAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("paste");
            $nJsEditor.setValue($k, $editor );
        }
    },
    deleteAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            $editor.execCommand("delete", null, false);
            $nJsEditor.setValue($k, $editor );
        }
    },
    extlinkAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            var $el = document.querySelector('.njseditor-panel-' + $k);
            var $popup = $nJsEditor.createLinkBox($el);
            
            var $select = $editor.getSelection().getRangeAt(0);

            /*if($select.rangeCount > 0) $select.removeAllRanges();

            var $selections = $editor.querySelectorAll(".njs-fake-link-selection");
            for(var i = 0; i < $selections.length; i++) {
                var range = document.createRange();
                range.selectNode($selections[i]);
                $selections.addRange(range);
            }*/

            //var $offsetLeft = ($select.endContainer.offsetLeft) ?? 0;
            //var $offsetTop = ($select.endContainer.offsetTop) ?? 0;
            //$offsetLeft += 10;
            //$offsetTop += 50;
            
            // remove fake link
            /*var $link = $select.startContainer.parentElement.querySelectorAll('.njs-fake-link-selection');
            if( $link.length > 0){
                $link.forEach( $v => {
                    var $html = $v.innerHTML;
                    console.log( $html );
                    var $newNode = document.createTextNode('');
                    $newNode.innerHTML = $html;

                    $select.deleteContents();
                    $select.insertNode($newNode);
                });
            }*/
            //console.log( 'Editor:', $select );

            
            var $selectCOn = $select.extractContents();
            var $span = document.createElement("span");
            $span.setAttribute('class', 'njs-fake-link-selection');
            $span.appendChild($selectCOn);
            $select.insertNode($span);

            var $offsetLeft = ($span.offsetLeft) ?? 0;
            var $offsetTop = ($span.offsetTop) ?? 0;
            $offsetTop += 60;
            
            $popup.style.top = $offsetTop + 'px';
            $popup.style.left = $offsetLeft  + 'px';

            /*var $link = $select.startContainer.parentElement.querySelectorAll('.njs-fake-link-selection');
            if( $link.length > 0){
                $link.forEach( $v => {
                    var $html = $v.innerHTML;
                    console.log( $html );
                    var $newNode = document.createTextNode('');
                    $newNode.replaceWholeText($html);
                    $select.deleteContents();
                    $select.insertNode($newNode);
                });
            }*/
            $select.toString();

            //$editor.execCommand("delete", null, false);
            //$nJsEditor.setValue($k, $editor );
        }
    },
    uploadfileAction: function( $e ){
        $e.preventDefault();
        var $this = this;
        var $k = $this.getAttribute('njs-control-id');
        if( !$k ){
            return;
        }
        console.log('Upload');
        var $editor = window.frames['njseditor-mode-' + $k].document;
        if($editor){
            //$editor.execCommand("delete", null, false);
            $nJsEditor.setValue($k, $editor );
        }
    },

    createLinkBox: function( $el ){
        if( !$el){
            return;
        }
        var $check = $el.querySelector('.njs-editor-overpopup');
        if($check){
            return $check;
        }
        var $popup = document.createElement('div');
        $popup.setAttribute('class', 'njs-editor-overpopup');
        $popup.innerText = 'Hello';
        $el.appendChild($popup);
        return $popup;
    }



};

// Accrodion calling
$nJsEditor.init('.nx-editor-selector');
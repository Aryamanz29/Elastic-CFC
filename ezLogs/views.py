from django.shortcuts import render, redirect
from pathlib import  Path
from .forms import  DocumentForm
import glob
import os

# Logs abs Path 
LOGS_DIR = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'media'))

def model_form_upload(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            # Logs abs Path
            print(LOGS_DIR) 
            logsList = glob.glob(LOGS_DIR + "/logs/*.log") 
            recentLog = max(logsList, key=os.path.getmtime)
            # Recent Log Path
            print(recentLog) 
             # Opening Log File as Read Mode
            with open(recentLog,"r") as log:
                logLines = log.readlines()
                # Printing First 5 Lines Of Recent Upload Log
                print(logLines[0:3])
                context = {
                'sampleLog': logLines[0:3],
                'form' : form,
                 }
            return render(request, 'index.html',context)
    else:
        form = DocumentForm()
    return render(request, 'index.html', {
        'form': form
    })

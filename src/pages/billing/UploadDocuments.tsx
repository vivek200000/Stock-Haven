
import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  FileUp, 
  Upload, 
  Image, 
  Cloud, 
  CheckCircle, 
  AlertCircle,
  FileText,
  X
} from "lucide-react";

export default function UploadDocuments() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("local");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...filesArray]);
      
      toast({
        title: "Files added",
        description: `${filesArray.length} files have been added successfully.`,
      });
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      setUploadedFiles([...uploadedFiles, ...filesArray]);
      
      toast({
        title: "Files added",
        description: `${filesArray.length} files have been added successfully.`,
      });
    }
  };
  
  const handleGooglePhotosUpload = () => {
    toast({
      title: "Google Photos",
      description: "Connecting to Google Photos integration...",
    });
    
    // In a real app, this would connect to Google Photos API
    setTimeout(() => {
      const mockFiles = [
        new File([""], "invoice_from_google_photos.pdf", { type: "application/pdf" }),
      ];
      
      setUploadedFiles([...uploadedFiles, ...mockFiles]);
      
      toast({
        title: "Connection successful",
        description: "1 file has been imported from Google Photos.",
      });
    }, 1500);
  };
  
  const handleOtherSourceUpload = () => {
    toast({
      title: "External Source",
      description: "Select external source for document upload...",
    });
    
    // This would normally open a dialog to select an external source
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    
    toast({
      title: "File removed",
      description: "The file has been removed from the upload queue.",
    });
  };
  
  const uploadAllFiles = () => {
    if (uploadedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No files to upload",
        description: "Please add files before uploading.",
      });
      return;
    }
    
    toast({
      title: "Upload initiated",
      description: `Uploading ${uploadedFiles.length} files...`,
    });
    
    // Simulating upload process
    setTimeout(() => {
      toast({
        title: "Upload complete",
        description: `${uploadedFiles.length} files have been uploaded successfully.`,
      });
      
      setUploadedFiles([]);
    }, 2000);
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Documents</h1>
          <p className="text-muted-foreground">
            Upload invoices, bills, and other financial documents
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>
              Upload invoices, bills and receipts from various sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="local" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="local">Local Device</TabsTrigger>
                <TabsTrigger value="google">Google Photos</TabsTrigger>
                <TabsTrigger value="other">Other Sources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="local" className="mt-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${
                    isDragging ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <FileUp className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Drag & Drop files here</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click the button below to select files from your device
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                  />
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Select Files
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="google" className="mt-6">
                <div className="border rounded-lg p-10 text-center">
                  <Image className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Import from Google Photos</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect to your Google Photos account to import invoices and bills
                  </p>
                  <Button onClick={handleGooglePhotosUpload}>
                    <Cloud className="h-4 w-4 mr-2" />
                    Connect to Google Photos
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="other" className="mt-6">
                <div className="border rounded-lg p-10 text-center">
                  <FileText className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Import from Other Sources</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect to cloud storage, email, or other document sources
                  </p>
                  <Button onClick={handleOtherSourceUpload}>
                    <Cloud className="h-4 w-4 mr-2" />
                    Select Source
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Files to Upload ({uploadedFiles.length})</h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                        <div>
                          <p className="font-medium truncate max-w-[200px] md:max-w-[400px]">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button onClick={uploadAllFiles}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload All Files
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

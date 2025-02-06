import React from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddNewBlog = ({
  openBlogDialog,
  setOpenBlogDialog,
  loading,
  blogFormData,
  setBlogFormData,
  handleSaveBlog,
  editBlogId,
  setEditBlogId,
}) => {
  console.log(editBlogId);
  return (
    <div>
      {/* dialog button */}
      <div>
        <Button
          onClick={() => {
            setOpenBlogDialog(true),
              setBlogFormData({
                title: "",
                description: "",
              });
            setEditBlogId(null);
          }}
        >
          Add Blog
        </Button>
      </div>

      {/* dialog details form */}
      <Dialog open={openBlogDialog} onOpenChange={setOpenBlogDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editBlogId === null ? "Add Blog" : "Update Blog"}
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={blogFormData.title}
                className="col-span-3"
                required
                onChange={(e) =>
                  setBlogFormData({
                    ...blogFormData,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                description
              </Label>
              <Input
                id="description"
                value={blogFormData.description}
                className="col-span-3"
                required
                onChange={(e) => {
                  setBlogFormData({
                    ...blogFormData,
                    description: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveBlog} type="submit">
              {editBlogId === null ? "Save Blog" : "Update Blog"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewBlog;
